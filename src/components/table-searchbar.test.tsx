import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TableSearchBar } from './table-searchbar'
import { useUserTable } from './user-table-context'

jest.mock('./user-table-context')

describe('table searchbar', () => {
  const setGlobalFilter = jest.fn()

  beforeEach(() => {
    jest.mocked(useUserTable).mockReturnValue({
      table: {
        setGlobalFilter,
      },
    } as any)
  })

  describe('when search is empty', () => {
    it('has placeholder that starts with Search by', () => {
      render(<TableSearchBar />)
      expect(screen.getByPlaceholderText(/Search by/)).toBeInTheDocument()
    })
  })

  describe('submitting search term by clicking search button', () => {
    it('sets the global table filter', async () => {
      render(<TableSearchBar />)
      await userEvent.type(screen.getByPlaceholderText(/Search by/), 'John Doe')
      await userEvent.click(screen.getByRole('button', { name: 'search' }))

      await waitFor(() => {
        expect(setGlobalFilter).toHaveBeenCalledWith('John Doe')
      })
    })
  })

  describe('submitting search term by pressing enter', () => {
    it('sets the global table filter', async () => {
      render(<TableSearchBar />)
      await userEvent.type(
        screen.getByPlaceholderText(/Search by/),
        'John Doe{Enter}'
      )

      await waitFor(() => {
        expect(setGlobalFilter).toHaveBeenCalledWith('John Doe')
      })
    })
  })
})
