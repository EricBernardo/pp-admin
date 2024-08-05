'use client'

import FormTask from '@/components/FormTask'
import { Header } from '@/components/Header'
import withAuth from '@/middleware/withAuth'

export function CreateTask() {
  return (
    <>
      <Header />
      <FormTask />
    </>
  )
}

export default withAuth(CreateTask)
