'use client'

import { Footer } from '@/components/Footer'
import FormTask from '@/components/FormTask'
import { Header } from '@/components/Header'
import withAuth from '@/middleware/withAuth'

export function TaskEdit({ params }: CreateProps) {
  return (
    <>
      <Header />
      <FormTask taskID={params.id} />
      <Footer />
    </>
  )
}

export default withAuth(TaskEdit)
