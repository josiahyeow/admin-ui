import { Table } from '@tanstack/react-table'
import { createContext, useContext } from 'react'
import { User, Users } from './use-users'

type UserTableContextValue = {
  table: Table<User>
  users: Users
}

const UserTableContext = createContext<UserTableContextValue | null>(null)

export function UserTableProvider({
  value,
  children,
}: {
  value: UserTableContextValue
  children: React.ReactNode
}) {
  return (
    <UserTableContext.Provider value={value}>
      {children}
    </UserTableContext.Provider>
  )
}

export const useUserTable = (): UserTableContextValue =>
  useContext(UserTableContext)!
