'use client'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import { withAuth } from '@/middleware/withAuth'

export function ListTasks() {
  return (
    <>
      <Header />
      <Table />
      <Footer />
    </>
  )
}

export default withAuth(ListTasks)
