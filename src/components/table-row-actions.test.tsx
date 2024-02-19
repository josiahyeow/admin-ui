import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TableRowActions } from './table-row-actions'

describe('table row actions', () => {
  describe('is not in edit mode', () => {
    describe('click delete button', () => {
      test('calls onDelete', async () => {
        const onDelete = jest.fn()
        render(
          <TableRowActions
            isEditing={false}
            onEdit={jest.fn()}
            onSave={jest.fn()}
            onDelete={onDelete}
          />
        )

        userEvent.click(screen.getByLabelText('delete'))
        await waitFor(() => expect(onDelete).toHaveBeenCalled())
      })
    })

    describe('click edit button', () => {
      test('calls onEdit', async () => {
        const onEdit = jest.fn()
        render(
          <TableRowActions
            isEditing={false}
            onEdit={onEdit}
            onSave={jest.fn()}
            onDelete={jest.fn()}
          />
        )

        userEvent.click(screen.getByLabelText('edit'))
        await waitFor(() => expect(onEdit).toHaveBeenCalled())
      })
    })

    test('save button is not shown', () => {
      render(
        <TableRowActions
          isEditing={false}
          onEdit={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      )

      expect(screen.queryByLabelText('save')).toBeNull()
    })
  })

  describe('is in edit mode', () => {
    test('click save button', async () => {
      const onSave = jest.fn()
      render(
        <TableRowActions
          isEditing={true}
          onEdit={jest.fn()}
          onSave={onSave}
          onDelete={jest.fn()}
        />
      )

      userEvent.click(screen.getByLabelText('save'))
      await waitFor(() => expect(onSave).toHaveBeenCalled())
    })

    test('edit button is not shown', () => {
      render(
        <TableRowActions
          isEditing={true}
          onEdit={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      )

      expect(screen.queryByLabelText('edit')).toBeNull()
    })
  })
})
