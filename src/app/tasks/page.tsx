'use client'

import Image from 'next/image'
import withAuth from '../hoc/withAuth'

const Tasks = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image src="/logo.png" alt="PicPay Logo" width={118} height={40} />
      <h1 className="m-4 text-2xl font-bold">Tasks</h1>
    </main>
  )
}

export default withAuth(Tasks)
