'use client'

import { AuthContext } from '@/contexts/AuthContext'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import validateEmail from '../../../helpers/validate-email'
import { Button } from '../Button'
import { ShowErrors } from '../ShowErrors'
import { TogglePasswordVisibility } from '../TogglePasswordVisibility'

export default function FormLogin() {
  const [user, setUser] = useState<UserAuth>({
    email: 'usuario@gmail.com',
    password: 'usuario',
  })

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

    if (!user.email || !user.password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    if (!validateEmail(user.email)) {
      setError('Por favor, insira um email válido.')
      return
    }

    await signIn(user)

    // setError(null)
    // setLoading(true)

    // try {
    //   const data = await get<User[]>('/account', {
    //     email: user.email,
    //     password: user.password,
    //   })

    //   if (data.length) {
    //     const findUser = data.find((e) => e.password === user.password)

    //     if (findUser) {
    //       alert('Login realizado com sucesso!')
    //       return
    //     }
    //   }
    //   setError('Usuário não encontrado ou senha incorreta.')
    // } catch (error) {
    //   setError('Erro ao realizar login. Tente novamente.')
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          E-mail
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.email}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Senha
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.password}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
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
