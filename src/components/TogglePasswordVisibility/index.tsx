import { ToggleEyeIcon } from '@/components/ToggleEyeIcon'
import { TogglePasswordVisibilityProps } from './types'

export function TogglePasswordVisibility({
  showPassword,
  handleTogglePasswordVisibility,
}: TogglePasswordVisibilityProps) {
  return (
    <div className="absolute right-2 top-10 flex items-center">
      <label
        htmlFor="showPassword"
        className="ml-2 text-sm text-gray-700 cursor-pointer flex items-center"
      >
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={handleTogglePasswordVisibility}
          className="form-checkbox h-4 w-4 text-blue-500 absolute opacity-0 cursor-pointer"
        />
        <ToggleEyeIcon
          showPassword={showPassword}
          className="absolute -left-5"
        />
        Mostrar senha
      </label>
    </div>
  )
}
