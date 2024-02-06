import { useEffect, useState } from 'react'

const USERS_ENDPOINT =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

export type User = {
  id: string
  name: string
  email: string
  role: string
}

export type Users = ReturnType<typeof useUsers>

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    const response = await fetch(USERS_ENDPOINT)
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const update = (id: string, data: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          return { ...u, ...data }
        }
        return u
      })
    )
  }

  const remove = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const removeMultiple = (ids: string[]) => {
    setUsers((prev) => prev.filter((user) => !ids.includes(user.id)))
  }

  return { data: users, update, remove, removeMultiple, loading }
}
