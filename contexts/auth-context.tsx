'use client'

import { DoctorShort } from '@/app/types/doctor-home'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

type SignInData = {
  crm: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: DoctorShort | null
  signIn: (data: SignInData) => void
  responseError?: string | null
  isLoading?: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<DoctorShort | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [responseError, setResponseError] = useState<string | null>()

  const isAuthenticated = !!user

  useEffect(() => {
    const fetchUserData = async () => {
      const { token } = parseCookies()
      if (!token) {
        return null
      }

      try {
        const userLocalData = localStorage.getItem('user')
        if (!userLocalData) return
        const userLocal = JSON.parse(userLocalData)
        setUser(userLocal)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  async function signIn({ crm, password }: SignInData) {
    setIsLoading(true)
    try {
      const { data } = await api.post('/login', {
        crm: crm,
        senha: password,
      })
      if (!data.token) return false

      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      api.defaults.headers['authorization'] = data.token
      setCookie(undefined, 'token', data.token, {
        maxAge: 12 * 60 * 60, // 12 hour
      })
      console.log('Redirecionando para o painel')
      setIsLoading(false)
      redirect('/dashboard/demonstrativos')
    } catch (error) {
      setIsLoading(false)
      setResponseError(error as string)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, responseError, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
