'use client'

import { FC } from 'react'

type Props = {
  type?: 'button' | 'submit'
  label: string
  disabled: boolean
}

export const Button: FC<Props> = ({
  type = 'submit',
  label = '',
  disabled = true,
}) => {
  return (
    <button
      type={type}
      className="bg-green rounded-md text-white w-full py-3 px-3"
      disabled={disabled}
    >
      {label}
    </button>
  )
}
