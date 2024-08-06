import { UserProps } from '@/types/user'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import nookies, { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<UserProps>()

  useEffect(() => {
    const { 'next-auth.user': user } = parseCookies()

    const { name, email } = JSON.parse(user)

    setUser({
      name: name,
      email: email,
    })
  }, [])

  const handleOnLogout = () => {
    nookies.destroy(null, 'next-auth.user', { path: '/' })
    router.replace('/')
  }

  const handleGoHome = () => {
    router.replace('/tasks')
  }

  return (
    <header className="text-black shadow-md p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          alt="PicPay Logo"
          width={118}
          height={40}
          onClick={handleGoHome}
        />

        <div className="flex justify-center items-center">
          {user?.name}
          <button
            onClick={handleOnLogout}
            className="bg-white bold text-sm py-2 px-4 relative"
          >
            <ArrowRightStartOnRectangleIcon width={20} height={20} />
            <span className="opacity-0 absolute">Sair</span>
          </button>
        </div>
      </div>
    </header>
  )
}
