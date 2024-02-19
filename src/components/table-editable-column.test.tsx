import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TableEditableColumn } from './table-editable-column'

describe('table editable column', () => {
  describe('when not editing', () => {
    it('renders value as text', () => {
      render(
        <TableEditableColumn
          onEdit={jest.fn()}
          column={
            {
              id: 'name',
            } as any
          }
          row={
            {
              id: '1',
            } as any
          }
          getValue={() => 'John Doe' as any}
          {...({} as any)}
        />
      )

      screen.findByText('John Doe')
      expect(screen.queryByRole('textbox')).toBeNull()
    })
  })

  describe('when editing', () => {
    it('renders value as input', () => {
      render(
        <TableEditableColumn
          onEdit={jest.fn()}
          isEditing={true}
          column={
            {
              id: 'name',
            } as any
          }
          row={
            {
              id: '1',
            } as any
          }
          getValue={() => 'John Doe' as any}
          {...({} as any)}
        />
      )

      expect(screen.getByLabelText('field-input')).toHaveValue('John Doe')
    })

    it('calls onEdit with updated value when field value is changed', async () => {
      const onEdit = jest.fn()
      render(
        <TableEditableColumn
          onEdit={onEdit}
          isEditing={true}
          column={
            {
              id: 'name',
            } as any
          }
          row={
            {
              id: '1',
            } as any
          }
          getValue={() => 'John Doe' as any}
          {...({} as any)}
        />
      )

      userEvent.type(
        screen.getByLabelText('field-input'),
        '{Backspace}{Backspace}{Backspace}Smith'
      )

      await waitFor(() =>
        expect(screen.getByLabelText('field-input')).toHaveValue('John Smith')
      )

      userEvent.tab()

      await waitFor(() =>
        expect(onEdit).toHaveBeenCalledWith('1', { name: 'John Smith' })
      )
    })
  })
})
