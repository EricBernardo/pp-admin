import FormLogin from '@/components/FormLogin'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image src="/logo.png" alt="PicPay Logo" width={118} height={40} />
      <h1 className="m-4 text-2xl font-bold">Acesse sua conta</h1>
      <FormLogin />
    </main>
  )
}
