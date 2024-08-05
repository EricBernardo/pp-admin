'use client'

import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import withAuth from '@/middleware/withAuth'

export function ListTasks() {
  return (
    <>
      <Header />
      <Table />
    </>
  )
}

export default withAuth(ListTasks)
