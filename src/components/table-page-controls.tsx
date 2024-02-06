import { css } from '@emotion/react'
import Icon from 'feather-icons-react'
import { color } from '../styles/colors'
import { useUserTable } from './user-table-context'

export function TablePageControls() {
  const { table } = useUserTable()
  const pageCount = table.getPageCount()
  const currentPageIndex = table.getState().pagination.pageIndex

  return (
    <div css={styles.layout}>
      <button
        className="first-page"
        css={[styles.pageButton, styles.firstItem]}
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <Icon icon="chevrons-left" size={16} />
      </button>
      <button
        className="previous-page"
        css={[styles.pageButton]}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icon icon="chevron-left" size={16} />
      </button>
      {[...Array(pageCount)].map((_, index) => (
        <button
          key={index}
          className={`page-${index}`}
          css={[
            styles.pageButton,
            currentPageIndex === index && styles.activePage,
          ]}
          onClick={() => table.setPageIndex(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="next-page"
        css={[styles.pageButton]}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <Icon icon="chevron-right" size={16} />
      </button>
      <button
        className="last-page"
        css={[styles.pageButton, styles.lastItem]}
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        <Icon icon="chevrons-right" size={16} />
      </button>
    </div>
  )
}

const styles = {
  layout: css`
    display: flex;
  `,
  icon: css`
    color: ${color.grey70};
  `,
  pageButton: css`
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    background-color: ${color.white};
    color: ${color.grey70};
    width: 2rem;
    height: 2rem;

    border: 1px solid ${color.grey10};
    border-left: 0.5px solid ${color.grey10};
    border-right: 0.5px solid ${color.grey10};

    font-weight: 600;
    line-height: 0.5rem;

    &:disabled {
      background-color: ${color.grey05};
      color: ${color.grey70};
      cursor: not-allowed;
    }
  `,
  activePage: css`
    background-color: ${color.grey95};
    color: ${color.grey05};
  `,
  firstItem: css`
    border-left: 1px solid ${color.grey10};
  `,
  lastItem: css`
    border-right: 1px solid ${color.grey10};
  `,
}
