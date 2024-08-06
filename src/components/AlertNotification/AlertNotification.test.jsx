const { render, screen } = require('@testing-library/react')

import { AlertNotification } from '.'

describe('<AlertNotification />', () => {
  test('should render the alertNotification with the text "Saved successfully"', () => {
    render(<AlertNotification message="Saved successfully" />)

    const alertNotification = screen.getByTestId('alert-notification')

    expect(alertNotification).toBeInTheDocument()
  })

  test('should render the alertNotification with the className "bg-green"', () => {
    render(<AlertNotification message="Saved successfully" />)

    const alertNotification = screen.getByTestId('alert-notification')

    expect(alertNotification).toHaveClass('bg-green')
  })

  test('should not render the alertNotification with the className "bg-green"', () => {
    render(<AlertNotification message="Saved successfully" type="error" />)

    const alertNotification = screen.getByTestId('alert-notification')

    expect(alertNotification).toHaveClass('bg-red')
  })
})
