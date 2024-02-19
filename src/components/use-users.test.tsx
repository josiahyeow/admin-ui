import { act, renderHook, waitFor } from '@testing-library/react'
import { useUsers } from './use-users'

const fetch = jest.fn()
window.fetch = fetch

describe('use users', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: async () => [
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ],
    } as any)
  })

  it('returns users data', async () => {
    const { result } = renderHook(() => useUsers())

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ])
    )
  })

  it('updates user data', async () => {
    const { result } = renderHook(() => useUsers())

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ])
    )

    act(() => {
      result.current.update('1', {
        name: 'Aaron Smith',
        email: 'smith@gmail.com',
        role: 'admin',
      })
    })

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Smith',
          email: 'smith@gmail.com',
          role: 'admin',
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ])
    )
  })

  it('removes user', async () => {
    const { result } = renderHook(() => useUsers())

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ])
    )

    act(() => {
      result.current.remove('2')
    })

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ])
    )
  })

  it('removes multiple users', async () => {
    const { result } = renderHook(() => useUsers())

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member',
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin',
        },
      ])
    )

    act(() => {
      result.current.removeMultiple(['2', '3'])
    })

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member',
        },
      ])
    )
  })
})
