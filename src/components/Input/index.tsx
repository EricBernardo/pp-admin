import { InputProps } from './types'

export function Input({
  handleChange = () => {},
  value,
  label,
  type = 'text',
  id,
  name,
  className,
}: InputProps) {
  return (
    <>
      <label
        data-testid="label"
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        data-testid="input"
        type={type}
        id={id}
        name={name}
        className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        value={value}
        onChange={handleChange}
        required
      />
    </>
  )
}
