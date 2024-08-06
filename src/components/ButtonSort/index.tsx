import { ButtonSortProps } from './types'

export function ButtonSort({ handleOnClick, children }: ButtonSortProps) {
  return (
    <button
      type="button"
      className="flex text-xs uppercase justify-center items-center"
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}
