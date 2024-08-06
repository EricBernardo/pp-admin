export type ButtonProps = {
  type?: 'button' | 'submit'
  disabled?: boolean
  color?: string
  handleOnClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}
