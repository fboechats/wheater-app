import { getMajorCitiesTemp, getCityForecast } from './index'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn()
}))

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>()

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post
      }))
    }
  }

  return mockAxios
})

describe('API functions', () => {
  describe('getMajorCitiesTemp', () => {
    test('returns major cities temperature', async () => {
      const mockResponse = {
        data: {
          forecast: {
            forecastday: [{ day: { maxtemp_c: 30, mintemp_c: 20 } }]
          }
        }
      }

      mocks.get.mockResolvedValue(mockResponse)

      const result = await getMajorCitiesTemp()

      expect(result).toEqual([
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' },
        { maxTemp: '30°', minTemp: '20°' }
      ])
    })
  })

  describe('getCityForecast', () => {
    test('returns city forecast', async () => {
      const mockResponse = {
        data: {
          current: {
            temp_c: 25,
            condition: { text: 'Sunny' },
            feelslike_c: 28,
            humidity: 70,
            wind_kph: 10
          },
          location: { name: 'New York', region: 'NY', country: 'US' },
          forecast: {
            forecastday: [
              { date: '2024-02-05', day: { maxtemp_c: 30, mintemp_c: 20 } },
              { date: '2024-02-06', day: { maxtemp_c: 29, mintemp_c: 19 } },
              { date: '2024-02-07', day: { maxtemp_c: 28, mintemp_c: 18 } },
              { date: '2024-02-08', day: { maxtemp_c: 27, mintemp_c: 17 } },
              { date: '2024-02-09', day: { maxtemp_c: 26, mintemp_c: 16 } }
            ]
          }
        }
      }

      mocks.get.mockResolvedValueOnce(mockResponse)

      mocks.get.mockResolvedValueOnce({
        data: { forecast: { forecastday: [{ day: { maxtemp_c: 30, mintemp_c: 20 }, date: '2024-02-05' }] } }
      })
      mocks.get.mockResolvedValueOnce({
        data: { forecast: { forecastday: [{ day: { maxtemp_c: 29, mintemp_c: 19 }, date: '2024-02-06' }] } }
      })
      mocks.get.mockResolvedValueOnce({
        data: { forecast: { forecastday: [{ day: { maxtemp_c: 28, mintemp_c: 18 }, date: '2024-02-07' }] } }
      })
      mocks.get.mockResolvedValueOnce({
        data: { forecast: { forecastday: [{ day: { maxtemp_c: 27, mintemp_c: 17 }, date: '2024-02-08' }] } }
      })
      mocks.get.mockResolvedValueOnce({
        data: { forecast: { forecastday: [{ day: { maxtemp_c: 26, mintemp_c: 16 }, date: '2024-02-09' }] } }
      })

      const result = await getCityForecast({ city: 'New York', days: 5 })

      expect(result).toEqual({
        temp: '25°',
        condition: 'Sunny',
        feelslike: '28°C',
        humidity: '70%',
        location: 'New York, NY - US',
        wind: '10km/h',
        maxTemp: '30°',
        minTemp: '20°',
        nextDays: [
          { day: 'Segunda', maxTemp: '30°', minTemp: '20°' },
          { day: 'Terça', maxTemp: '29°', minTemp: '19°' },
          { day: 'Quarta', maxTemp: '28°', minTemp: '18°' },
          { day: 'Quinta', maxTemp: '27°', minTemp: '17°' },
          { day: 'Sexta', maxTemp: '26°', minTemp: '16°' }
        ]
      })
    })
  })
})
