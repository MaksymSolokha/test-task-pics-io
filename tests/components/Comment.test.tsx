import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { vi } from 'vitest'
import { store } from '../../src/redux/store/store'
import CommentCard from '../../src/components/Comment'
import { removeComment } from '../../src/redux/slices/commentSlice'

// Mock the removeComment action
vi.mock('../redux/slices/commentSlice.ts', () => ({
    removeComment: vi.fn(),
}))

const mockUser = {
    id: 1,
    username: 'testuser',
    fullName: 'Test User',
}

const setup = (overrides = {}) => {
    const props = {
        id: 1,
        body: 'This is a comment.',
        postId: 123,
        likes: 5,
        user: mockUser,
        ...overrides,
    }

    return render(
        <Provider store={store}>
            <CommentCard {...props} />
        </Provider>
    )
}

describe('CommentCard', () => {
    it('renders comment details correctly', () => {
        setup()

        expect(screen.getByText(mockUser.fullName)).toBeInTheDocument()
        expect(screen.getByText('This is a comment.')).toBeInTheDocument()
        expect(screen.getByText('👍 5')).toBeInTheDocument()
        expect(screen.getByText(mockUser.username)).toBeInTheDocument()
        expect(screen.getByText('PostID 123')).toBeInTheDocument()
    })

    it('toggles the delete menu when button is clicked', () => {
        setup()

        const toggleButton = screen.getByRole('button', { name: /.../i })
        fireEvent.click(toggleButton)

        expect(screen.getByText('Delete')).toBeInTheDocument()

        fireEvent.click(toggleButton)

        expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })

    it('dispatches removeComment action when delete button is clicked', async () => {
        setup()

        const toggleButton = screen.getByRole('button', { name: /.../i })
        fireEvent.click(toggleButton)

        const deleteButton = screen.getByText('Delete')
        fireEvent.click(deleteButton)

        waitFor(() => {
            expect(removeComment).toHaveBeenCalledWith(1)
        })
    })

    it('does not show the delete menu if id is not provided', () => {
        setup({ id: undefined })

        const toggleButton = screen.getByRole('button', { name: /.../i })
        fireEvent.click(toggleButton)

        expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
})
