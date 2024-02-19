import { render, screen } from '@testing-library/react'
import { TableCheckbox } from './table-checkbox'

describe('table checkbox', () => {
  it('renders checkbox', () => {
    render(<TableCheckbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('sets indeterminate if not checked and indeterminate is true', () => {
    render(<TableCheckbox indeterminate />)
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true)
  })
})
