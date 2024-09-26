// src/components/Input.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { vi } from 'vitest'
import { store } from '../../src/redux/store/store'
import Input from '../../src/components/Input'
import { addComment } from '../../src/redux/slices/commentSlice'

describe('Input Component', () => {
    beforeEach(() => {
        // Очистити localStorage перед кожним тестом
        localStorage.clear()
        // Мокати dispatch
        vi.clearAllMocks()
    })

    it('renders input fields', () => {
        render(
            <Provider store={store}>
                <Input />
            </Provider>
        )

        expect(screen.getByPlaceholderText('Name...')).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/username.../i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/comment.../i)).toBeInTheDocument()
    })

    it('allows users to type in input fields', () => {
        render(
            <Provider store={store}>
                <Input />
            </Provider>
        )

        const fullNameInput = screen.getByPlaceholderText('Name...') as HTMLInputElement
        const usernameInput = screen.getByPlaceholderText(/username.../i) as HTMLInputElement
        const commentInput = screen.getByPlaceholderText(/comment.../i) as HTMLInputElement

        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
        fireEvent.change(usernameInput, { target: { value: 'johnny' } })
        fireEvent.change(commentInput, { target: { value: 'This is a comment' } })

        expect(fullNameInput.value).toBe('John Doe')
        expect(usernameInput.value).toBe('johnny')
        expect(commentInput.value).toBe('This is a comment')
    })

    it('dispatches addComment action on form submit', () => {
        const dispatchMock = vi.fn()
        vi.mock('../hooks/redux-hooks.ts', () => ({
            useAppDispatch: () => dispatchMock,
        }))

        render(
            <Provider store={store}>
                <Input />
            </Provider>
        )

        const fullNameInput = screen.getByPlaceholderText('Name...') as HTMLInputElement
        const usernameInput = screen.getByPlaceholderText(/username.../i) as HTMLInputElement
        const commentInput = screen.getByPlaceholderText(/comment.../i) as HTMLInputElement

        fireEvent.change(screen.getByPlaceholderText('Name...'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText(/username.../i), {
            target: { value: 'johnny' },
        })
        fireEvent.change(screen.getByPlaceholderText(/comment.../i), {
            target: { value: 'This is a comment' },
        })

        fireEvent.click(screen.getByRole('button', { name: /send/i }))

        waitFor(() => {
            expect(dispatchMock).toHaveBeenCalledTimes(1)
            expect(dispatchMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: addComment.type,
                    payload: expect.objectContaining({
                        user: expect.objectContaining({
                            username: 'johnny',
                            fullName: 'John Doe',
                        }),
                        body: 'This is a comment',
                    }),
                })
            )
        })

        expect(fullNameInput.value).toBe('')
        expect(usernameInput.value).toBe('')
        expect(commentInput.value).toBe('')
        expect(localStorage.getItem('commentForm')).toBeNull()
    })

    it('saves form values in localStorage', () => {
        render(
            <Provider store={store}>
                <Input />
            </Provider>
        )

        const fullNameInput = screen.getByPlaceholderText('Name...')
        const usernameInput = screen.getByPlaceholderText(/username.../i)
        const commentInput = screen.getByPlaceholderText(/comment.../i)

        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
        fireEvent.change(usernameInput, { target: { value: 'johnny' } })
        fireEvent.change(commentInput, { target: { value: 'This is a comment' } })

        expect(localStorage.getItem('commentForm')).toEqual(
            JSON.stringify({
                username: 'johnny',
                fullName: 'John Doe',
                comment: 'This is a comment',
            })
        )
    })

    it('loads saved form values from localStorage', () => {
        localStorage.setItem(
            'commentForm',
            JSON.stringify({
                username: 'johnny',
                fullName: 'John Doe',
                comment: 'This is a comment',
            })
        )

        render(
            <Provider store={store}>
                <Input />
            </Provider>
        )

        const fullNameInput = screen.getByPlaceholderText('Name...') as HTMLInputElement
        const usernameInput = screen.getByPlaceholderText(/username.../i) as HTMLInputElement
        const commentInput = screen.getByPlaceholderText(/comment.../i) as HTMLInputElement

        expect(fullNameInput.value).toBe('John Doe')
        expect(usernameInput.value).toBe('johnny')
        expect(commentInput.value).toBe('This is a comment')
    })
})
