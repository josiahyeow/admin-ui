import { css } from '@emotion/react'
import Icon from 'feather-icons-react'
import { ui } from '../styles'
import { color } from '../styles/colors'

export function TableRowActions({
  isEditing,
  onEdit,
  onSave,
  onDelete,
}: {
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onDelete: () => void
}) {
  return (
    <div css={styles.layout}>
      <button className="delete" css={styles.button} onClick={onDelete}>
        <Icon icon="trash" size={16} css={styles.icon} />
      </button>
      {isEditing ? (
        <button className="save" css={styles.button} onClick={onSave}>
          <Icon icon="check" size={16} css={styles.icon} />
        </button>
      ) : (
        <button className="edit" css={styles.button} onClick={onEdit}>
          <Icon icon="edit" size={16} css={styles.icon} />
        </button>
      )}
    </div>
  )
}

const styles = {
  layout: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  button: css`
    ${ui.button};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border: none;
    cursor: pointer;
    background-color: transparent;
    border-radius: 100%;
  `,
  icon: css`
    color: ${color.grey40};
    transition: color 0.2s;

    &:hover {
      color: ${color.grey70};
    }
  `,
}
