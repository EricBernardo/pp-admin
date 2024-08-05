import { ButtonProps } from './types'

export function Button({
  disabled = false,
  label,
  type = 'submit',
  className,
  handleOnClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-green rounded-md text-white w-full py-3 px-3 mb-3 ${className}`}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {label}
    </button>
  )
}
