import { css } from '@emotion/react'
import { color, ui } from '../styles'
import { useUserTable } from './user-table-context'

export function DeleteSelectedButton() {
  const { table, users } = useUserTable()
  const rowSelection = table.getState().rowSelection
  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id])

  return (
    <button
      css={styles.button}
      onClick={() => users.removeMultiple(selectedIds)}
      disabled={selectedIds.length === 0}
    >
      Delete selected
    </button>
  )
}

const styles = {
  button: css`
    ${ui.button};
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    background-color: ${color.red50};
    color: ${color.red05};
    border-radius: 1rem;
    font-weight: 600;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      background-color: ${color.grey20};
      color: ${color.grey40};
      cursor: not-allowed;
    }
  `,
}
