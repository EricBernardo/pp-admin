export type InputProps = {
  type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'checkbox'
  id: string
  name: string
  label: string
  value: string | number
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}
