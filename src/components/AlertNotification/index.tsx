import { AlertNotificationProps } from '@/types/alertNotification'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export function AlertNotification({
  message,
  type = 'success',
}: AlertNotificationProps) {
  if (!message) return null

  return (
    <div
      data-testid="alert-notification"
      className={`flex items-center p-4 mb-4 text-white rounded-lg ${type === 'success' ? 'bg-green' : 'bg-red'} absolute top-3 right-3`}
      role="alert"
    >
      <ExclamationCircleIcon width={20} />
      <div className="ms-3 text-sm font-medium">{message}</div>
    </div>
  )
}
