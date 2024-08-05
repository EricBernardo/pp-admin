import { ButtonProps } from './types'

export function Button({
  disabled = false,
  label,
  type = 'submit',
  color = 'bg-green',
  handleOnClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md text-white w-full py-3 px-3 mb-3 ${color}`}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {label}
    </button>
  )
}
