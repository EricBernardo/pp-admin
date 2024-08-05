'use client'

import { Table } from '@/components/Table'
import withAuth from '@/middleware/withAuth'
import Image from 'next/image'

export function Tasks() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image src="/logo.png" alt="PicPay Logo" width={118} height={40} />
      <h1 className="m-4 text-2xl font-bold">Tasks</h1>
      <Table />
    </main>
  )
}

export default withAuth(Tasks)
