'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'
import { ToggleEyeIconProps } from './types'

export function ToggleEyeIcon({
  showPassword = true,
  className = '',
}: ToggleEyeIconProps) {
  return showPassword ? (
    <EyeIcon className={`w-6 h-6 ${className}`} />
  ) : (
    <EyeSlashIcon className={`w-6 h-6 ${className}`} />
  )
}
