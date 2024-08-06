export type ButtonProps = {
  type?: 'button' | 'submit'
  label: string
  disabled?: boolean
  className?: string
  handleOnClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
