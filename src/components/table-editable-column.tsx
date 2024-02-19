import { css } from '@emotion/react'
import { CellContext } from '@tanstack/react-table'
import { FocusEvent, useState } from 'react'
import { color, ui } from '../styles'
import { User } from './use-users'

export function TableEditableColumn({
  onEdit,
  isEditing = false,
  ...props
}: {
  onEdit: (id: string, data: Partial<User>) => void
  isEditing: boolean
} & CellContext<User, unknown>) {
  const initialValue = props.getValue()
  const [value, setValue] = useState(initialValue)

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    onEdit(props.row.id, {
      [props.column.id]: value,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(e.relatedTarget as any)?.click?.()
  }

  if (isEditing) {
    return (
      <input
        css={styles.input}
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        aria-label="field-input"
      />
    )
  }

  return <div css={styles.value}>{value as string}</div>
}

const styles = {
  input: css`
    ${ui.input}
    border: 1px solid ${color.grey20};
    padding: 0.6rem;
  `,
  value: css`
    color: ${color.grey40};
  `,
}
