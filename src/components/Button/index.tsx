import { ButtonProps } from './types'

export function Button({
  disabled = false,
  type = 'submit',
  color = 'bg-green',
  handleOnClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md text-white w-full py-3 px-3 mb-3 ${color}`}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}
