import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from './index'

describe('Card component', () => {
  const onCloseMock = vitest.fn() // Mock onClose function
  const location = 'New York'
  const temp = 20
  const condition = 'Sunny'
  const maxTemp = 25
  const minTemp = 15
  const feelslike = 22
  const wind = 10
  const humidity = 70
  const nextDays = [
    { day: 'Tuesday', maxTemp: '25°', minTemp: '16°' },
    { day: 'Wednesday', maxTemp: '26°', minTemp: '17°' },
    { day: 'Thursday', maxTemp: '24°', minTemp: '15°' },
    { day: 'Friday', maxTemp: '23°', minTemp: '14°' },
    { day: 'Saturday', maxTemp: '22°', minTemp: '13°' }
  ]

  test('renders weather information correctly', () => {
    const { getByText } = render(
      <Card
        location={location}
        temp={temp}
        condition={condition}
        maxTemp={maxTemp}
        minTemp={minTemp}
        feelslike={feelslike}
        wind={wind}
        humidity={humidity}
        nextDays={nextDays}
        onClose={onCloseMock}
      />
    )

    expect(getByText(location)).toBeInTheDocument()
    expect(getByText(`${temp}°C ${condition}`)).toBeInTheDocument()
    expect(getByText(`${minTemp}°`)).toBeInTheDocument()
    expect(getByText(`${maxTemp}°`)).toBeInTheDocument()
    expect(getByText(`${feelslike}°`)).toBeInTheDocument()
    expect(getByText(`${wind}km/h`)).toBeInTheDocument()
    expect(getByText(`${humidity}%`)).toBeInTheDocument()

    nextDays.forEach((day) => {
      expect(getByText(day.day)).toBeInTheDocument()
      expect(getByText(`${day.minTemp} ${day.maxTemp}`)).toBeInTheDocument()
    })
  })

  test('calls onClose function when close button is clicked', async () => {
    const { getByRole } = render(
      <Card
        location={location}
        temp={temp}
        condition={condition}
        maxTemp={maxTemp}
        minTemp={minTemp}
        feelslike={feelslike}
        wind={wind}
        humidity={humidity}
        nextDays={nextDays}
        onClose={onCloseMock}
      />
    )

    await userEvent.click(getByRole('button'))

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
