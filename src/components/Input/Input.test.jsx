const { render, screen, fireEvent } = require('@testing-library/react')

import userEvent from '@testing-library/user-event'
import { Input } from '.'

describe('<Input />', () => {
  test('should render the input', () => {
    render(<Input id="search" name="search" label="seach" value="teste" />)

    const input = screen.getByTestId('input')

    expect(input).toBeInTheDocument()
  })

  test('should render the input', () => {
    const value = 'Lorem ipsum'

    render(<Input id="search" name="search" label="Search" value={value} />)

    const input = screen.getByTestId('input')

    expect(input.value).toBe(value)
  })

  test('should call function on each key press', async () => {
    const fn = jest.fn()

    render(<Input id="search" name="search" label="Seach" handleChange={fn} />)

    const input = screen.getByTestId('input')

    const value = 'Lorem ipsum...'

    await userEvent.type(input, value)

    expect(input.value).toBe(value)

    expect(fn).toHaveBeenCalledTimes(value.length)
  })
})
