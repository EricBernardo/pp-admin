import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'

export function Header() {
  const router = useRouter()

  const handleOnLogout = () => {
    nookies.destroy(null, 'next-auth.user', { path: '/' })
    router.replace('/')
  }

  return (
    <header className="bg-blue-600 text-black shadow-md p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Image src="/logo.png" alt="PicPay Logo" width={118} height={40} />

        <div className="flex justify-center items-center">
          Eric Sousa
          <button
            onClick={handleOnLogout}
            className="bg-white bold text-sm py-2 px-4 relative"
          >
            <ArrowRightStartOnRectangleIcon width={20} height={20} />
            <span className="opacity-0 absolute">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
