'use client'

import { Button } from '@/components/Button'
import { ShowErrors } from '@/components/ShowErrors'
import { TogglePasswordVisibility } from '@/components/TogglePasswordVisibility'
import { AuthContext } from '@/contexts/AuthContext'
import { AuthProps } from '@/types/user'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Input } from '../Input'

export default function FormLogin() {
  const [user, setUser] = useState<AuthProps>({
    email: 'usuario@gmail.com',
    password: 'usuario',
  })

  const router = useRouter()

  const { signIn } = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

    setError(null)

    setLoading(true)

    try {
      const signInResult = await signIn(user)

      if (signInResult.user) {
        router.replace('/tasks')
        return false
      }

      setError(signInResult.error)
    } catch (error) {
      setError('Erro ao realizar login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md"
    >
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
      <ShowErrors error={error} />
      <Button label={loading ? 'Entrando...' : 'Entrar'} disabled={loading} />
    </form>
  )
}
