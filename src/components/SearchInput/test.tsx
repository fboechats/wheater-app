import { render, fireEvent } from '@testing-library/react'
import { SearchInput } from './index'

describe('SearchInput component', () => {
  test('renders input field with placeholder and search button', () => {
    const placeholder = 'Enter city'
    const onSearchMock = vi.fn() // Mock onSearch function

    const { getByPlaceholderText, getByRole } = render(
      <SearchInput placeholder={placeholder} onSearch={onSearchMock} />
    )
    const input = getByPlaceholderText(placeholder)
    const button = getByRole('button')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test('calls onSearch function with correct city when form is submitted', () => {
    const placeholder = 'Enter city'
    const onSearchMock = vi.fn() // Mock onSearch function

    const { getByPlaceholderText, getByRole } = render(
      <SearchInput placeholder={placeholder} onSearch={onSearchMock} />
    )
    const input = getByPlaceholderText(placeholder)
    const button = getByRole('button')

    const cityName = 'New York'
    fireEvent.change(input, { target: { value: cityName } }) // Change input value
    fireEvent.click(button) // Click on the search button to submit the form

    expect(onSearchMock).toHaveBeenCalledWith(cityName)
  })
})
