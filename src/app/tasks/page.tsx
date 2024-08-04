'use client'

import withAuth from '@/middleware/withAuth'
import Image from 'next/image'

export function Tasks() {
  /*  const result = await apiRequest<ApiResult<ProjectTypeItemProps>>(
    `projects/${params.slug}`,
  )
  const project = result?.data
  if (!project?.components) return null */

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image src="/logo.png" alt="PicPay Logo" width={118} height={40} />
      <h1 className="m-4 text-2xl font-bold">Tasks</h1>
      {/* <Tasks tasks={tasks}/> */}
    </main>
  )
}

export default withAuth(Tasks)
