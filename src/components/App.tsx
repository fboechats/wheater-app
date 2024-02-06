import { GetMajorCitiesTempReturn, getCityForecast, getMajorCitiesTemp, majorCities } from 'api'
import { SearchInput } from 'components/SearchInput'
import { useCallback, useEffect, useState } from 'react'
import { Card, CardProps } from './Card'

function App() {
  const [majorCitiesTemp, setMajorCitiesTemp] = useState<GetMajorCitiesTempReturn>([])
  const [showCard, setShowCard] = useState(false)
  const [cardInfo, setCardInfo] = useState<Omit<CardProps, 'onClose'>>(null)

  useEffect(() => {
    async function fetch() {
      const result = await getMajorCitiesTemp()

      setMajorCitiesTemp(result)
    }

    fetch()
  }, [setMajorCitiesTemp])

  const searchCity = useCallback(async (city: string) => {
    const cityForecast = await getCityForecast({ city: city, days: 5 })

    setCardInfo(cityForecast)
    setShowCard(true)
  }, [])

  useEffect(() => {
    async function fetch() {
      console.log()
    }

    fetch()
  }, [])

  return (
    <div className="relative overflow-auto bg-gradient-to-b from-[#FF7D00] to-[#FFB400] font-sans">
      <div className="h-screen pt-12">
        <div className="relative mx-auto sm:static sm:max-w-xl">
          <h1 className="mb-24 text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Previsão do tempo
          </h1>
          {showCard && <Card {...cardInfo} onClose={() => setShowCard(false)} />}
          <div className="mt-4 flex flex-col items-center gap-8">
            <SearchInput placeholder="Insira aqui o nome da cidade" onSearch={searchCity} />
            <div className="w-full border-t-[1px] pl-10 pt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Capitais
            </div>
            <div className="flex w-full flex-wrap px-10">
              <div className="mb-4 min-w-[200px] flex-auto text-base">
                <span className="mr-2">Min</span>
                <span>Max</span>
              </div>
              <div className="mb-0 hidden min-w-[200px] text-base sm:mb-4 sm:block">
                <span className="mr-2">Min</span>
                <span>Max</span>
              </div>
              {majorCities.map((majorCity, index) => (
                <div
                  key={majorCity}
                  className="mb-4 min-w-[200px] text-xl font-bold odd:flex-[1_1_100%] sm:odd:flex-auto"
                >
                  <span className="mr-2">{majorCitiesTemp[index]?.minTemp}</span>
                  <span className="mr-4">{majorCitiesTemp[index]?.maxTemp}</span>
                  <span>{majorCity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
