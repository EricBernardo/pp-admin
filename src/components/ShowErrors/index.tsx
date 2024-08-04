import { ShowErrorsProps } from './types'

export function ShowErrors({ error }: ShowErrorsProps) {
  if (!error) return null

  return <p className="text-red text-sm mb-6">{error}</p>
}
