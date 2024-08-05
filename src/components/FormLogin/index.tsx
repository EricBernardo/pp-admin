'use client'

import { AlertNotification } from '@/components/AlertNotification'
import { Button } from '@/components/Button'
import { TogglePasswordVisibility } from '@/components/TogglePasswordVisibility'
import { AuthContext } from '@/contexts/AuthContext'
import { AlertNotificationProps } from '@/types/alertNotification'
import { AuthProps } from '@/types/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Input } from '../Input'

export function FormLogin() {
  const [user, setUser] = useState<AuthProps>({
    email: 'usuario@gmail.com',
    password: 'usuario',
  })

  const router = useRouter()

  const { signIn } = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false)

  const [notification, setNotification] = useState<AlertNotificationProps>({
    message: null,
    type: null,
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setNotification({ message: null, type: null })

    setLoading(true)

    try {
      const signInResult = await signIn(user)

      if (signInResult.user) {
        router.replace('/tasks')
        return false
      }

      setNotification({ message: signInResult.error, type: 'error' })
    } catch (e: any) {
      setNotification({ message: e.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <Image
        src="/logo.png"
        alt="PicPay Logo"
        className="mx-auto"
        width={118}
        height={40}
      />
      <h1 className="m-4 text-2xl font-bold text-center">Acesse sua conta</h1>
      <div className="mb-4">
        <Input
          id="email"
          name="email"
          label="E-mail"
          type="email"
          value={user.email}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-6 relative">
        <Input
          id="password"
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          handleChange={handleChange}
        />
        <TogglePasswordVisibility
          showPassword={showPassword}
          handleTogglePasswordVisibility={handleTogglePasswordVisibility}
        />
      </div>
      <AlertNotification
        message={notification.message}
        type={notification.type}
      />
      <Button disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
    </form>
  )
}
