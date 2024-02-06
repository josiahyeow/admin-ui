import { css } from '@emotion/react'
import { flexRender } from '@tanstack/react-table'
import { color } from '../styles/colors'
import { useUserTable } from './user-table-context'

export function Table() {
  const { table } = useUserTable()

  return (
    <table css={styles.table}>
      <thead css={styles.header}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} css={[styles.cell, styles.headerRow]}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} css={styles.row(row.getIsSelected())}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} css={[styles.cell]}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}

const styles = {
  table: css`
    background-color: ${color.white};
    width: 100%;
    border: 1px solid ${color.grey20};
    border-spacing: 0px;
    border-collapse: collapse;
  `,
  header: css`
    color: ${color.grey70};
    background-color: ${color.grey05};
  `,
  headerRow: css`
    text-align: left;
    border-bottom: 1px solid ${color.grey20};
  `,
  cell: css`
    color: ${color.grey95};
    padding: 0.6rem;
    font-size: 0.8rem;
  `,
  row: (isSelected: boolean) => css`
    ${isSelected && `background-color: ${color.grey05}`};
    border-bottom: 1px solid ${color.grey20};

    &:hover {
      background-color: ${color.grey05};
    }

    &:last-child {
      border: none;
    }
  `,
}
