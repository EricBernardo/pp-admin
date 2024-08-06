export type InputProps = {
  id: string
  name: string
  label: string
  checked: boolean
  handleOnClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
