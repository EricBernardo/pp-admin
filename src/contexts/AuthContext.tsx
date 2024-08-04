'use client'

import { signInRequest } from '@/app/services/auth'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type User = {
  name: string
  email: string
}

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
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

  async function signIn({ email, password }: SignInData) {
    const { user } = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'next-auth.user', JSON.stringify(user), {
      maxAge: 12 * 60 * 60, // 12 hour
    })

    setUser(user)

    router.replace('/tasks')
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
