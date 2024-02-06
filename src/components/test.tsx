import { render, screen } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /Previsão do Tempo/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/Capitais/i)).toBeInTheDocument()

    expect(
      screen.getByRole('searchbox', {
        name: /Insira aqui o nome da cidade/i
      })
    ).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
