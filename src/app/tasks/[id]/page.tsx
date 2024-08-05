'use client'

import FormTask from '@/components/FormTask'
import { Header } from '@/components/Header'
import withAuth from '@/middleware/withAuth'

export function TaskEdit({ params }: CreateProps) {
  return (
    <>
      <Header />
      <FormTask taskID={params.id} />
    </>
  )
}

export default withAuth(TaskEdit)
