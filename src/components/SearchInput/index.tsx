import { SearchIcon } from 'components/Icons/SearchIcon'

type SearchInputProps = {
  placeholder: string
  onSearch: (city: string) => void
}

export const SearchInput = ({ placeholder, onSearch }: SearchInputProps) => (
  <form
    className="relative w-full max-w-96 pt-2 text-gray-600"
    onSubmit={(event) => {
      event.preventDefault()

      const form = new FormData(event.target as HTMLFormElement)

      const city = form.get('city')

      if (typeof city === 'string') {
        onSearch(city)
      }
    }}
  >
    <input
      aria-label={placeholder}
      className="h-10 w-full rounded-lg bg-white px-5 pr-16 text-sm focus:outline-none"
      type="search"
      name="city"
      placeholder={placeholder}
    />
    <button name="Search" type="submit" className="absolute right-0 top-0 mr-4 mt-5" onClick={console.log}>
      <SearchIcon />
    </button>
  </form>
)
