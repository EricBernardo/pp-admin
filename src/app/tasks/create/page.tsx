'use client'

import { Footer } from '@/components/Footer'
import { FormTask } from '@/components/FormTask'
import { Header } from '@/components/Header'
import { withAuth } from '@/middleware/withAuth'

export function CreateTask() {
  return (
    <>
      <Header />
      <FormTask />
      <Footer />
    </>
  )
}

export default withAuth(CreateTask)
