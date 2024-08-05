'use client'

import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import withAuth from '@/middleware/withAuth'

export function ListTasks() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Table />
      </main>
    </>
  )
}

export default withAuth(ListTasks)
