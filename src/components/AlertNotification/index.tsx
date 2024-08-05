import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import { AlertProps } from './types'

export function AlertNotification({ message, type = 'success' }: AlertProps) {
  if (!message) return null

  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }, [visible])

  return (
    <div
      id="alert-1"
      className={`flex items-center p-4 mb-4 text-white rounded-lg ${type === 'success' ? 'bg-green' : 'bg-red'} absolute top-3 right-3 transition-opacity duration-300 ${visible ? 'opacity-90' : 'opacity-0'}`}
      role="alert"
    >
      <ExclamationCircleIcon width={20} />
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">{message}</div>
    </div>
  )
}
