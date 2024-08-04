'use client'

import { FC } from 'react'

type Props = {
  error?: string | null
}

export const ShowErrors: FC<Props> = ({ error = '' }) => {
  return <p className="text-red text-sm mb-6">{error}</p>
}
