const { render, screen, fireEvent } = require('@testing-library/react')

import { Button } from '.'

describe('<Button />', () => {
  test('should render the button with the text "Save"', () => {
    render(<Button>Save</Button>)

    const button = screen.getByRole('button', {
      name: 'Save',
    })

    expect(button).toBeInTheDocument()
  })

  test('should call function on button click', () => {
    const fn = jest.fn()

    render(<Button handleOnClick={fn}>Save</Button>)

    const button = screen.getByRole('button', {
      name: 'Save',
    })

    fireEvent.click(button)

    expect(fn).toHaveBeenCalled()
  })

  test('should be disabled when disabled is true', () => {
    const fn = jest.fn()

    render(<Button disabled={true}>Save</Button>)

    const button = screen.getByRole('button', {
      name: 'Save',
    })

    expect(button).toBeDisabled()
  })

  test('should be disabled when disabled is false', () => {
    const fn = jest.fn()

    render(<Button disabled={false}>Save</Button>)

    const button = screen.getByRole('button', {
      name: 'Save',
    })

    expect(button).toBeEnabled()
  })

  test('should be have className "bg-red"', () => {
    const fn = jest.fn()

    render(<Button color="bg-red">Save</Button>)

    const button = screen.getByRole('button', {
      name: 'Save',
    })

    expect(button).toHaveClass('bg-red')
  })
})
