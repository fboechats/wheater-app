import { render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { getMajorCitiesTemp, getCityForecast } from 'api' // Assuming these are mocked

vitest.mock('api', () => ({
  getMajorCitiesTemp: vitest.fn(),
  getCityForecast: vitest.fn()
}))

describe('App component', () => {
  beforeEach(() => {
    getMajorCitiesTemp.mockResolvedValue([
      { minTemp: 10, maxTemp: 20 },
      { minTemp: 15, maxTemp: 25 }
    ])

    getCityForecast.mockResolvedValue({
      location: 'New York',
      temp: 20,
      condition: 'Sunny',
      maxTemp: 25,
      minTemp: 15,
      feelslike: 22,
      wind: 10,
      humidity: 70,
      nextDays: [
        { day: 'Tuesday', maxTemp: '25°', minTemp: '16°' },
        { day: 'Wednesday', maxTemp: '26°', minTemp: '17°' },
        { day: 'Thursday', maxTemp: '24°', minTemp: '15°' },
        { day: 'Friday', maxTemp: '23°', minTemp: '14°' },
        { day: 'Saturday', maxTemp: '22°', minTemp: '13°' }
      ]
    })
  })

  test('renders major cities weather information and search input', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<App />)

    expect(
      getByRole('heading', {
        name: /Previsão do Tempo/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(getByText(/Capitais/i)).toBeInTheDocument()

    expect(getByText('Min')).toBeInTheDocument()
    expect(getByText('Max')).toBeInTheDocument()
    expect(getByText('São Paulo')).toBeInTheDocument()
    expect(getByText('Rio de Janeiro')).toBeInTheDocument()

    expect(getByPlaceholderText('Insira aqui o nome da cidade')).toBeInTheDocument()
  })

  test('displays weather information card when city is searched', async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<App />)

    const searchInput = getByPlaceholderText('Insira aqui o nome da cidade')
    fireEvent.change(searchInput, { target: { value: 'New York' } })
    fireEvent.click(getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(getByText('New York')).toBeInTheDocument()
      expect(getByText('20°C Sunny')).toBeInTheDocument()
      expect(getByText('Min')).toBeInTheDocument()
      expect(getByText('Max')).toBeInTheDocument()
      expect(getByText('16° 25°')).toBeInTheDocument()
    })
  })

  test('hides weather information card when showCard state is false', () => {
    const { queryByText } = render(<App />)
    expect(queryByText('New York')).not.toBeInTheDocument()
    expect(queryByText('20°C Sunny')).not.toBeInTheDocument()
    expect(queryByText('Min')).not.toBeInTheDocument()
    expect(queryByText('Max')).not.toBeInTheDocument()
    expect(queryByText('16° 25°')).not.toBeInTheDocument()
  })
})
