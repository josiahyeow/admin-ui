import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useUsers } from './use-users'
import { UserTable } from './user-table'

jest.mock('./use-users')
jest.mock('./table-loading', () => ({
  TableLoading: () => <div>loading...</div>,
}))

describe('user table', () => {
  const users = {
    update: jest.fn(),
    remove: jest.fn(),
    data: [],
    loading: false,
  } as any

  beforeEach(() => {
    jest.mocked(useUsers).mockReturnValue(users)
  })

  it('renders column titles', () => {
    render(<UserTable />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(<UserTable />)

    expect(screen.getByPlaceholderText(/Search by/)).toBeInTheDocument()
  })

  it('renders delete selected button', () => {
    render(<UserTable />)

    expect(
      screen.getByRole('button', { name: 'Delete selected' })
    ).toBeInTheDocument()
  })

  it('renders user data', () => {
    users.data = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@email.com',
        role: 'admin',
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@email.com',
        role: 'member',
      },
      {
        id: '3',
        name: 'Billy Bob',
        email: 'billy@email.com',
        role: 'other',
      },
    ]
    render(<UserTable />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@email.com')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@email.com')).toBeInTheDocument()
    expect(screen.getByText('member')).toBeInTheDocument()

    expect(screen.getByText('Billy Bob')).toBeInTheDocument()
    expect(screen.getByText('billy@email.com')).toBeInTheDocument()
    expect(screen.getByText('other')).toBeInTheDocument()
  })

  describe('search term is entered', () => {
    it('filters users by search term', async () => {
      render(<UserTable />)

      userEvent.type(screen.getByPlaceholderText(/Search by/), 'John{Enter}')

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
      })
    })
  })

  describe('row delete button clicked', () => {
    it('calls remove on user', async () => {
      users.data = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@email.com',
          role: 'admin',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@email.com',
          role: 'member',
        },
      ]

      render(<UserTable />)

      await userEvent.click(
        screen.queryAllByRole('button', { name: 'delete' })[0]
      )

      await waitFor(() => expect(users.remove).toHaveBeenCalledWith('1'))
    })
  })

  describe('row edit button is clicked', () => {
    it('makes row field editable', async () => {
      users.data = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@email.com',
          role: 'admin',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@email.com',
          role: 'member',
        },
      ]

      render(<UserTable />)

      await userEvent.click(
        screen.queryAllByRole('button', { name: 'edit' })[0]
      )

      const inputFields = screen.queryAllByLabelText('field-input')

      expect(inputFields[0]).toHaveValue('John Doe')
      expect(inputFields[1]).toHaveValue('john@email.com')
      expect(inputFields[2]).toHaveValue('admin')
    })
  })

  describe('row save button is clicked', () => {
    it('makes row field non editable', async () => {
      users.data = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@email.com',
          role: 'admin',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@email.com',
          role: 'member',
        },
      ]

      render(<UserTable />)

      await userEvent.click(
        screen.queryAllByRole('button', { name: 'edit' })[0]
      )

      await userEvent.click(screen.getByRole('button', { name: 'save' }))

      const inputFields = screen.queryAllByLabelText('field-input')

      expect(inputFields.length).toBe(0)
    })
  })

  describe('row select checkbox is clicked', () => {
    it('selects row', async () => {
      users.data = [
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
      ]

      render(<UserTable />)

      await userEvent.click(
        screen.getByRole('checkbox', { name: 'select row 2 checkbox' })
      )

      await waitFor(() => {
        expect(screen.getByLabelText('select row 2 checkbox')).toBeChecked()
      })
    })
  })

  describe('select all rows is clicked', () => {
    it('only selects rows on current page', async () => {
      users.data = [
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
        {
          id: '4',
          name: 'Caterina Binotto',
          email: 'caterina@mailinator.com',
          role: 'member',
        },
        {
          id: '5',
          name: 'Chetan Kumar',
          email: 'chetan@mailinator.com',
          role: 'member',
        },
        {
          id: '6',
          name: 'Jim McClain',
          email: 'jim@mailinator.com',
          role: 'member',
        },
        {
          id: '7',
          name: 'Mahaveer Singh',
          email: 'mahaveer@mailinator.com',
          role: 'member',
        },
        {
          id: '8',
          name: 'Rahul Jain',
          email: 'rahul@mailinator.com',
          role: 'admin',
        },
        {
          id: '9',
          name: 'Rizan Khan',
          email: 'rizan@mailinator.com',
          role: 'member',
        },
        {
          id: '10',
          name: 'Sarah Potter',
          email: 'sarah@mailinator.com',
          role: 'admin',
        },
        {
          id: '11',
          name: 'Keshav Muddaiah',
          email: 'keshav@mailinator.com',
          role: 'member',
        },
        {
          id: '12',
          name: 'Nita Ramesh',
          email: 'nita@mailinator.com',
          role: 'member',
        },
      ]

      render(<UserTable />)

      await userEvent.click(
        screen.getByRole('checkbox', { name: 'select all rows checkbox' })
      )

      await waitFor(() => {
        expect(screen.getByLabelText('select row 1 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 2 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 3 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 4 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 5 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 6 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 7 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 8 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 9 checkbox')).toBeChecked()
        expect(screen.getByLabelText('select row 10 checkbox')).toBeChecked()
      })

      await userEvent.click(screen.getByRole('button', { name: '2' }))

      await waitFor(() => {
        expect(
          screen.getByLabelText('select row 11 checkbox')
        ).not.toBeChecked()
        expect(
          screen.getByLabelText('select row 12 checkbox')
        ).not.toBeChecked()
      })
    })
  })
})

describe('user table loading', () => {
  it('renders loading component when loading', () => {
    const users = {
      loading: true,
    } as any

    jest.mocked(useUsers).mockReturnValue(users)

    render(<UserTable />)

    expect(screen.getByText('loading...')).toBeInTheDocument()
  })
})
