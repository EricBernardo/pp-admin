const { render, screen, fireEvent } = require('@testing-library/react')

import userEvent from '@testing-library/user-event'
import { Checkbox } from '.'

describe('<Checkbox />', () => {
  test('should render the checkbox', () => {
    render(<Checkbox id="isPayed" name="isPayed" label="Payed" />)

    const checkbox = screen.getByTestId('checkbox')

    expect(checkbox).toBeInTheDocument()
  })

  test('should be is checked', () => {
    render(<Checkbox id="isPayed" name="isPayed" checked={true} />)

    const checkbox = screen.getByTestId('checkbox')

    expect(checkbox).toBeChecked()

    userEvent.click(checkbox)
  })

  test('should be is not checked', () => {
    render(<Checkbox id="isPayed" name="isPayed" checked={false} />)

    const checkbox = screen.getByTestId('checkbox')

    expect(checkbox).not.toBeChecked()
  })

  test('should call function on checkbox click', () => {
    const fn = jest.fn()

    render(<Checkbox handleOnClick={fn}>isPayed</Checkbox>)

    const button = screen.getByTestId('checkbox')

    fireEvent.click(button)

    expect(fn).toHaveBeenCalled()
  })
})
