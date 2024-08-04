import { ChangeEventHandler } from 'react'

export type TogglePasswordVisibilityProps = {
  showPassword: boolean
  handleTogglePasswordVisibility: ChangeEventHandler<HTMLInputElement>
}
