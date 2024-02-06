import { css } from '@emotion/react'
import Icon from 'feather-icons-react'
import { useState } from 'react'
import { color, ui } from '../styles'
import { useUserTable } from './user-table-context'

export function TableSearchBar() {
  const { table } = useUserTable()

  const [searchValue, setSearchValue] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    table.setGlobalFilter(searchValue)
  }
  return (
    <form onSubmit={onSubmit}>
      <div css={styles.layout}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          placeholder="Search by name, email or role"
          css={styles.searchbar}
        />
        <button className="search-icon" type="submit" css={styles.searchButton}>
          <Icon icon="search" size={16} css={{ color: color.grey05 }} />
        </button>
      </div>
    </form>
  )
}

const styles = {
  layout: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  `,
  icon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 1rem;
  `,
  searchbar: css`
    ${ui.input};
    padding: 0.6rem 1rem;
    width: 100%;
    max-width: 256px;
    background-color: ${color.grey05};
    border-radius: 1.6rem;
  `,
  searchButton: css`
    ${ui.button};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: ${color.grey05};
    background-color: ${color.grey95};
    border: 1px solid ${color.grey95};
    border-radius: 1rem;
    width: 2rem;
    height: 2rem;
  `,
}
