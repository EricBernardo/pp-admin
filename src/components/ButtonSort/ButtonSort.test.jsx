const { render, screen, fireEvent } = require('@testing-library/react')

import { ButtonSort } from '.'

describe('<ButtonSort />', () => {
  test('should render the sort button', () => {
    render(<ButtonSort>Save</ButtonSort>)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test('should call function on sort button click', () => {
    const fn = jest.fn()

    render(<ButtonSort handleOnClick={fn}>Sort (ASC/DESC)</ButtonSort>)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(fn).toHaveBeenCalled()
  })
})
