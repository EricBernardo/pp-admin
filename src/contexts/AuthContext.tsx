'use client'

import { signInRequest } from '@/services/auth'
import { UserProps } from '@/types/user'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type SignInProps = {
  user: UserProps | null
  error: string | null
}

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  user: UserProps | null
  signIn: (data: UserProps) => Promise<SignInProps>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'next-auth.user': user } = parseCookies()

    if (user) {
      setUser(JSON.parse(user))
    }

    setLoading(false)
  }, [])

  async function signIn({ email, password }: UserProps) {
    const { user } = await signInRequest({
      email,
      password,
    })

    if (user) {
      setCookie(undefined, 'next-auth.user', JSON.stringify(user), {
        maxAge: process.env.AUTH_TTL,
      })

      setUser(user)

      return {
        user: {
          name: user.name,
          email: user.email,
        },
        error: null,
      }
    }
    return {
      user: null,
      error: 'Usuário não encontrado ou senha incorreta.',
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
