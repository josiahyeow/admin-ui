import { render, screen } from '@testing-library/react'
import { DeleteSelectedButton } from './delete-selected-button'
import { useUserTable } from './user-table-context'

jest.mock('./user-table-context')

describe('delete selected button', () => {
  describe('when no rows are selected', () => {
    test('button is disabled', () => {
      jest.mocked(useUserTable).mockReturnValue({
        table: { getState: () => ({ rowSelection: {} }) },
        users: { removeMultiple: jest.fn() },
      } as any)

      render(<DeleteSelectedButton />)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('when rows are selected', () => {
    test('button is enabled', () => {
      jest.mocked(useUserTable).mockReturnValue({
        table: { getState: () => ({ rowSelection: { 1: true } }) },
        users: { removeMultiple: jest.fn() },
      } as any)

      render(<DeleteSelectedButton />)
      expect(screen.getByRole('button')).toBeEnabled()
    })

    test('clicking button deletes multiple rows', () => {
      const removeMultiple = jest.fn()
      jest.mocked(useUserTable).mockReturnValue({
        table: {
          getState: () => ({ rowSelection: { 1: true, 2: true, 3: false } }),
        },
        users: { removeMultiple },
      } as any)

      render(<DeleteSelectedButton />)
      screen.getByRole('button').click()
      expect(removeMultiple).toHaveBeenCalledWith(['1', '2'])
    })
  })
})
