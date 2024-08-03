'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log('E-mail:', email)
    console.log('Password:', password)

    const response = await fetch('http://localhost:3030/account')

    const data = await response.json()

    const user = data.find((e: any) => e.email == email)

    if (user) {
      alert('OK')
    } else {
      alert('NOK')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image src="/logo.png" alt="PicPay Logo" width={118} height={40} />
      <h1 className="m-4 text-2xl">Acesse sua conta</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            className="border border-gray rounded-md w-full py-2 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="border border-gray rounded-md w-full py-2 px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute right-3 top-8">
            <input
              type="checkbox"
              id="showPassword"
              onClick={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="pl-2 noselect">
              Mostrar senha
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green rounded-md text-white w-full py-3 px-3"
        >
          Login
        </button>
      </form>
    </main>
  )
}
