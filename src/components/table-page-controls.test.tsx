import { render, screen } from '@testing-library/react'
import { TablePageControls } from './table-page-controls'
import { useUserTable } from './user-table-context'

jest.mock('./user-table-context')

describe('table page controls', () => {
  describe('no previous page', () => {
    test('first page and previous page button is disabled', () => {
      const table = {
        getCanPreviousPage: () => false,
        getCanNextPage: () => true,
        previousPage: jest.fn(),
        nextPage: jest.fn(),
        setPageIndex: jest.fn(),
        getPageCount: () => 3,
        getPageIndex: () => 0,
        getState: () => ({ pagination: { pageIndex: 0 } }),
      } as any

      jest.mocked(useUserTable).mockReturnValue({ table } as any)

      render(<TablePageControls />)
      expect(screen.getByRole('button', { name: 'first page' })).toBeDisabled()
      expect(
        screen.getByRole('button', { name: 'previous page' })
      ).toBeDisabled()
    })
  })

  describe('no next page', () => {
    test('last page and next page button is disabled', () => {
      const table = {
        getCanPreviousPage: () => true,
        getCanNextPage: () => false,
        previousPage: jest.fn(),
        nextPage: jest.fn(),
        setPageIndex: jest.fn(),
        getPageCount: () => 3,
        getPageIndex: () => 3,
        getState: () => ({ pagination: { pageIndex: 2 } }),
      } as any

      jest.mocked(useUserTable).mockReturnValue({ table } as any)

      render(<TablePageControls />)
      expect(screen.getByRole('button', { name: 'next page' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'last page' })).toBeDisabled()
    })
  })

  describe('multiple pages', () => {
    it('page buttons have correct classNames', () => {
      const table = {
        getCanPreviousPage: () => true,
        getCanNextPage: () => true,
        previousPage: jest.fn(),
        nextPage: jest.fn(),
        setPageIndex: jest.fn(),
        getPageCount: () => 3,
        getPageIndex: () => 1,
        getState: () => ({ pagination: { pageIndex: 1 } }),
      } as any

      jest.mocked(useUserTable).mockReturnValue({ table } as any)

      render(<TablePageControls />)
      expect(screen.getByRole('button', { name: 'first page' })).toHaveClass(
        'first-page'
      )
      expect(screen.getByRole('button', { name: 'previous page' })).toHaveClass(
        'previous-page'
      )
      expect(screen.getByRole('button', { name: 'next page' })).toHaveClass(
        'next-page'
      )
      expect(screen.getByRole('button', { name: 'last page' })).toHaveClass(
        'last-page'
      )

      expect(screen.getByRole('button', { name: '1' })).toHaveClass('page-0')
      expect(screen.getByRole('button', { name: '2' })).toHaveClass('page-1')
      expect(screen.getByRole('button', { name: '3' })).toHaveClass('page-2')
    })

    it('renders page buttons', () => {
      const table = {
        getCanPreviousPage: () => true,
        getCanNextPage: () => true,
        previousPage: jest.fn(),
        nextPage: jest.fn(),
        setPageIndex: jest.fn(),
        getPageCount: () => 3,
        getPageIndex: () => 1,
        getState: () => ({ pagination: { pageIndex: 1 } }),
      } as any

      jest.mocked(useUserTable).mockReturnValue({ table } as any)

      render(<TablePageControls />)
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    })

    it('highlights current page', () => {
      const table = {
        getCanPreviousPage: () => true,
        getCanNextPage: () => true,
        previousPage: jest.fn(),
        nextPage: jest.fn(),
        setPageIndex: jest.fn(),
        getPageCount: () => 3,
        getPageIndex: () => 1,
        getState: () => ({ pagination: { pageIndex: 1 } }),
      } as any

      jest.mocked(useUserTable).mockReturnValue({ table } as any)

      render(<TablePageControls />)
      expect(screen.getByRole('button', { name: '2' })).toHaveStyle(
        'background-color: #0E1829; color: #F7F7F5'
      )
    })

    describe('click page number button', () => {
      it('calls setPageIndex with page number', () => {
        const table = {
          getCanPreviousPage: () => true,
          getCanNextPage: () => true,
          previousPage: jest.fn(),
          nextPage: jest.fn(),
          setPageIndex: jest.fn(),
          getPageCount: () => 3,
          getPageIndex: () => 1,
          getState: () => ({ pagination: { pageIndex: 1 } }),
        } as any

        jest.mocked(useUserTable).mockReturnValue({ table } as any)

        render(<TablePageControls />)
        screen.getByRole('button', { name: '3' }).click()
        expect(table.setPageIndex).toHaveBeenCalledWith(2)
      })
    })

    describe('click first page button', () => {
      it('calls setPageIndex with 0', () => {
        const table = {
          getCanPreviousPage: () => true,
          getCanNextPage: () => true,
          previousPage: jest.fn(),
          nextPage: jest.fn(),
          setPageIndex: jest.fn(),
          getPageCount: () => 3,
          getPageIndex: () => 1,
          getState: () => ({ pagination: { pageIndex: 1 } }),
        } as any

        jest.mocked(useUserTable).mockReturnValue({ table } as any)

        render(<TablePageControls />)
        screen.getByRole('button', { name: 'first page' }).click()
        expect(table.setPageIndex).toHaveBeenCalledWith(0)
      })
    })

    describe('click previous page button', () => {
      it('calls previousPage', () => {
        const table = {
          getCanPreviousPage: () => true,
          getCanNextPage: () => true,
          previousPage: jest.fn(),
          nextPage: jest.fn(),
          setPageIndex: jest.fn(),
          getPageCount: () => 3,
          getPageIndex: () => 1,
          getState: () => ({ pagination: { pageIndex: 1 } }),
        } as any

        jest.mocked(useUserTable).mockReturnValue({ table } as any)

        render(<TablePageControls />)
        screen.getByRole('button', { name: 'previous page' }).click()
        expect(table.previousPage).toHaveBeenCalled()
      })
    })

    describe('click next page button', () => {
      it('calls nextPage', () => {
        const table = {
          getCanPreviousPage: () => true,
          getCanNextPage: () => true,
          previousPage: jest.fn(),
          nextPage: jest.fn(),
          setPageIndex: jest.fn(),
          getPageCount: () => 3,
          getPageIndex: () => 1,
          getState: () => ({ pagination: { pageIndex: 1 } }),
        } as any

        jest.mocked(useUserTable).mockReturnValue({ table } as any)

        render(<TablePageControls />)
        screen.getByRole('button', { name: 'next page' }).click()
        expect(table.nextPage).toHaveBeenCalled()
      })
    })

    describe('click last page button', () => {
      it('calls setPageIndex with pageCount - 1', () => {
        const table = {
          getCanPreviousPage: () => true,
          getCanNextPage: () => true,
          previousPage: jest.fn(),
          nextPage: jest.fn(),
          setPageIndex: jest.fn(),
          getPageCount: () => 3,
          getPageIndex: () => 1,
          getState: () => ({ pagination: { pageIndex: 1 } }),
        } as any

        jest.mocked(useUserTable).mockReturnValue({ table } as any)

        render(<TablePageControls />)
        screen.getByRole('button', { name: 'last page' }).click()
        expect(table.setPageIndex).toHaveBeenCalledWith(2)
      })
    })
  })
})
