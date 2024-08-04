import { ButtonProps } from './types'

export function Button({
  disabled = false,
  label,
  type = 'submit',
}: ButtonProps) {
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
