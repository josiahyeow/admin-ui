import { css } from '@emotion/react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ColumnDef,
  FilterFn,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { DeleteSelectedButton } from './delete-selected-button'
import { Table } from './table'
import { TableCheckbox } from './table-checkbox'
import { TableEditableColumn } from './table-editable-column'
import { TableLoading } from './table-loading'
import { TablePageControls } from './table-page-controls'
import { TableRowActions } from './table-row-actions'
import { TableSearchBar } from './table-searchbar'
import { User, useUsers } from './use-users'
import { UserRoleTag } from './user-role-tag'
import { UserTableProvider } from './user-table-context'

export function UserTable() {
  const users = useUsers()
  const [currentEditableRowId, setCurrentEditableRowId] = useState<
    string | null
  >(null)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columnHelper = createColumnHelper<User>()

  const defaultColumn: Partial<ColumnDef<User>> = {
    cell: (props) => (
      <TableEditableColumn
        {...props}
        isEditing={currentEditableRowId === props.row.id}
        onEdit={users.update}
      />
    ),
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select-col',
        header: ({ table }) => (
          <TableCheckbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="select all rows checkbox"
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`select row ${row.index + 1} checkbox`}
          />
        ),
      }),
      {
        accessorKey: 'name',
        header: 'Name',
        cell: currentEditableRowId
          ? defaultColumn.cell
          : (props) => (
              <span css={styles.name}>{props.row.getValue('name')}</span>
            ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: currentEditableRowId
          ? defaultColumn.cell
          : (props) => (
              <span css={styles.email}>{props.row.getValue('email')}</span>
            ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: currentEditableRowId
          ? defaultColumn.cell
          : (props) => (
              <div css={{ display: 'flex' }}>
                <UserRoleTag role={props.row.getValue('role')} />
              </div>
            ),
      },
      columnHelper.display({
        id: 'actions',
        cell: (props) => {
          const isEditing = currentEditableRowId === props.row.id
          return (
            <TableRowActions
              isEditing={isEditing}
              onEdit={() => {
                setCurrentEditableRowId(props.row.id)
              }}
              onSave={() => {
                setCurrentEditableRowId(null)
              }}
              onDelete={() => users.remove(props.row.id)}
            />
          )
        },
        header: () => <div css={styles.actions}>Actions</div>,
      }),
    ],
    [columnHelper, currentEditableRowId, defaultColumn.cell, users]
  )

  const table = useReactTable({
    data: users.data,
    defaultColumn,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getRowId: (row) => row.id,
    state: {
      rowSelection,
      globalFilter,
    },
  })

  if (users.loading) {
    return (
      <div css={styles.layout}>
        <TableLoading />
      </div>
    )
  }

  return (
    <UserTableProvider value={{ table, users }}>
      <div css={styles.layout}>
        <div css={styles.topControls}>
          <TableSearchBar />
        </div>
        <Table />
        <div css={styles.bottomControls}>
          <div>
            <DeleteSelectedButton />
          </div>
          <div>
            <TablePageControls />
          </div>
        </div>
      </div>
    </UserTableProvider>
  )
}

const fuzzyFilter: FilterFn<User> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value, { threshold: 4 })
  addMeta({
    itemRank,
  })
  return itemRank.passed
}

const styles = {
  layout: css`
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    gap: 1rem;
    padding: 2px;
  `,
  search: css`
    align-self: flex-start;
  `,
  name: css`
    font-weight: 500;
  `,
  email: css``,
  role: css`
    display: flex;
  `,
  actions: css`
    text-align: center;
  `,

  topControls: css`
    padding-top: 1rem;
    width: 100%;
  `,
  bottomControls: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  `,
}
