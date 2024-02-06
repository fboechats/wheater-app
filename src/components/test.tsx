import { render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { getMajorCitiesTemp, getCityForecast } from 'api'

vitest.mock('api', async (importOriginal) => {
  const original = await importOriginal<typeof import('api')>()
  return {
    ...original,
    getMajorCitiesTemp: vitest.fn(),
    getCityForecast: vitest.fn()
  }
})

describe('App component', () => {
  beforeEach(() => {
    vitest.mocked(getMajorCitiesTemp).mockResolvedValue([
      { minTemp: '10°', maxTemp: '20°' },
      { minTemp: '15°', maxTemp: '25°' }
    ])

    vitest.mocked(getCityForecast).mockResolvedValue({
      location: 'Recife',
      temp: '20°C',
      condition: 'Sol',
      maxTemp: '25°',
      minTemp: '15°',
      feelslike: '22°',
      wind: '10km/h',
      humidity: '70%',
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
    const { getByText, getByPlaceholderText, getByRole, getAllByText } = render(<App />)

    expect(
      getByRole('heading', {
        name: /Previsão do Tempo/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(getByText(/Capitais/i)).toBeInTheDocument()

    expect(getAllByText('Min')).toHaveLength(2)
    expect(getAllByText('Max')).toHaveLength(2)
    expect(getByText('Sao Paulo')).toBeInTheDocument()
    expect(getByText('Rio de Janeiro')).toBeInTheDocument()

    expect(getByPlaceholderText('Insira aqui o nome da cidade')).toBeInTheDocument()
  })

  test('displays weather information card when city is searched', async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<App />)

    const searchInput = getByPlaceholderText('Insira aqui o nome da cidade')
    fireEvent.change(searchInput, { target: { value: 'New York' } })
    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(getByText('Recife')).toBeInTheDocument()
      expect(getByText('20°C Sol')).toBeInTheDocument()
      expect(getByText('25°')).toBeInTheDocument()
      expect(getByText('15°')).toBeInTheDocument()
      expect(getByText('Sensação')).toBeInTheDocument()
      expect(getByText('22°')).toBeInTheDocument()
      expect(getByText('Vento')).toBeInTheDocument()
      expect(getByText('10km/h')).toBeInTheDocument()
      expect(getByText('Humidade')).toBeInTheDocument()
      expect(getByText('70%')).toBeInTheDocument()
      expect(getByText('Tuesday')).toBeInTheDocument()
      expect(getByText('16° 25°')).toBeInTheDocument()
    })
  })

  test('hides weather information card when showCard state is false', () => {
    const { queryByText } = render(<App />)
    expect(queryByText('New York')).not.toBeInTheDocument()
    expect(queryByText('20°C Sunny')).not.toBeInTheDocument()
    expect(queryByText('16° 25°')).not.toBeInTheDocument()
  })
})
