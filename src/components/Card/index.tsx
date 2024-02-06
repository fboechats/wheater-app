import { ArrowDownIcon } from 'components/Icons/ArrowDownIcon'
import { ArrowUpIcon } from 'components/Icons/ArrowUpIcon'
import { CloseIcon } from 'components/Icons/CloseIcon'

export type CardProps = {
  location: string
  temp: string
  condition: string
  maxTemp: string
  minTemp: string
  feelslike: string
  wind: string
  humidity: string
  nextDays: Array<{ day: string; maxTemp: string; minTemp: string }>
  onClose: () => void
}

export const Card = ({
  location,
  temp,
  condition,
  maxTemp,
  minTemp,
  feelslike,
  wind,
  humidity,
  nextDays,
  onClose
}: CardProps) => (
  <div className="relative w-full bg-[#fff0e1] pt-2 font-bold text-gray-600 shadow-lg">
    <button className="absolute right-6 top-6 cursor-pointer" onClick={onClose}>
      <CloseIcon />
    </button>
    <div className="mt-4 px-16">
      <div className="mb-12">{location}</div>
      <div className="mb-12 text-6xl">{`${temp} ${condition}`}</div>
      <div className="mb-4 flex items-center text-lg">
        <div className="mr-12 flex w-[150px]">
          <div className="mr-4 flex items-center">
            <div className="mr-1 text-[#ff9600]">
              <ArrowDownIcon />
            </div>
            {minTemp}
          </div>
          <div className="flex items-center">
            <div className="mr-1 text-[#ff9600]">
              <ArrowUpIcon />
            </div>
            {maxTemp}
          </div>
        </div>
        <div className="flex items-center">
          <div className="font-normal">Sensação</div>
          &nbsp;
          <div>{feelslike}</div>
        </div>
      </div>
      <div className="flex items-center text-lg">
        <div className="mr-12  flex w-[150px] items-center">
          <div className="font-normal">Vento</div>
          &nbsp;
          <div>{wind}</div>
        </div>
        <div className="flex items-center">
          <div className="font-normal">Humidade</div>
          &nbsp;
          <div>{humidity}</div>
        </div>
      </div>
    </div>
    <div className="mx-10 mt-6 flex justify-between border-t-[1px] border-[#ff9600] p-6">
      {nextDays.map((nextDay) => (
        <div key={nextDay.day} className="flex flex-col items-center">
          <div>{nextDay.day}</div>
          <div className="text-[#ff9600]">{`${nextDay.minTemp} ${nextDay.maxTemp}`}</div>
        </div>
      ))}
    </div>
  </div>
)
