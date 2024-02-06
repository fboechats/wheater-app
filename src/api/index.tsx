import axiosClass from 'axios'
import { CardProps } from 'components/Card'

const axios = axiosClass.create({
  baseURL: 'https://api.weatherapi.com/v1/forecast.json',
  params: {
    lang: 'pt',
    key: import.meta.env.VITE_API_KEY
  }
})

export const majorCities = [
  'Rio de Janeiro',
  'Sao Paulo',
  'Belo Horizonte',
  'Brasilia',
  'Belem',
  'Salvador',
  'Curitiba',
  'Fortaleza',
  'Manaus',
  'Joao Pessoa'
]

export type GetMajorCitiesTempReturn = Array<{
  maxTemp: string
  minTemp: string
}>

export const getMajorCitiesTemp = async (): Promise<GetMajorCitiesTempReturn> => {
  const forecastPromises = majorCities.map((city) =>
    axios.get('', {
      params: {
        q: city,
        dt: new Date().toISOString().split('T')[0]
      }
    })
  )

  return Promise.all(forecastPromises).then((responses) =>
    responses.map((response) => ({
      maxTemp: `${response.data.forecast.forecastday[0].day.maxtemp_c.toFixed()}°`,
      minTemp: `${response.data.forecast.forecastday[0].day.mintemp_c.toFixed()}°`
    }))
  )
}

const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

type GetCityForecastProps = {
  city: string
  days: number
}

export const getCityForecast = async ({ city, days }: GetCityForecastProps): Promise<Omit<CardProps, 'onClose'>> => {
  const todayCityForecast = await axios.get('', {
    params: {
      q: city,
      days: days,
      dt: new Date().toISOString().split('T')[0]
    }
  })

  const current = todayCityForecast.data.current
  const location = todayCityForecast.data.location
  const forecast = todayCityForecast.data.forecast

  const cityForecastPromises = []

  for (let index = 1; index <= days; index++) {
    const date = new Date()

    date.setDate(new Date().getDate() + index)

    cityForecastPromises.push(
      axios.get('', {
        params: {
          q: city,
          dt: date.toISOString().split('T')[0]
        }
      })
    )
  }

  const nextDaysForecast = await Promise.all(cityForecastPromises).then((responses) => {
    console.log(responses)
    return responses.map((response) => ({
      day: weekDays[new Date(response.data.forecast.forecastday[0].date).getDay()],
      maxTemp: `${response.data.forecast.forecastday[0].day.maxtemp_c.toFixed()}°`,
      minTemp: `${response.data.forecast.forecastday[0].day.mintemp_c.toFixed()}°`
    }))
  })

  return {
    temp: `${current.temp_c.toFixed()}°`,
    condition: current.condition.text,
    feelslike: `${current.feelslike_c.toFixed()}°C`,
    humidity: `${current.humidity}%`,
    location: `${location.name}, ${location.region} - ${location.country}`,
    wind: `${current.wind_kph}km/h`,
    maxTemp: `${forecast.forecastday[0].day.maxtemp_c.toFixed()}°`,
    minTemp: `${forecast.forecastday[0].day.mintemp_c.toFixed()}°`,
    nextDays: nextDaysForecast
  }
}
