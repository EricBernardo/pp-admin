'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'
import { FC } from 'react'

type Props = {
  showPassword: boolean
  className: string
}

export const ToggleEyeIcon: FC<Props> = ({
  showPassword = true,
  className = '',
}) => {
  return showPassword ? (
    <EyeIcon className={`w-6 h-6 ${className}`} />
  ) : (
    <EyeSlashIcon className={`w-6 h-6 ${className}`} />
  )
}
