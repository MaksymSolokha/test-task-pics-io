import { render, screen } from '@testing-library/react'
import { describe, test, vi } from 'vitest'
import { Provider } from 'react-redux'
import * as reduxHooks from '../src/hooks/redux-hooks'
import * as commentSlice from '../src/redux/slices/commentSlice'
import App from '../src/App'
import { store } from '../src/redux/store/store'

vi.mock('./components/Comment.tsx', () => ({
    __esModule: true,
    default: ({ body }: { body: string }) => <div>{body}</div>,
}))

vi.mock('./components/Input.tsx', () => ({
    __esModule: true,
    default: () => <input placeholder="Add a comment" />,
}))

vi.mock('./components/Skeleton.tsx', () => ({
    __esModule: true,
    default: () => <div>Loading...</div>,
}))

vi.mock('./components/CommentsNotFound.tsx', () => ({
    __esModule: true,
    default: () => <div>No comments found</div>,
}))

const handleScroll = () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString())
}

describe('App component', () => {
    test('renders loading state', () => {
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            data: { comments: [], total: 0 },
            loading: true,
        })

        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        const skeletonContainer = container.querySelector('.animate-pulse')
        expect(skeletonContainer).toBeInTheDocument()
    })

    test('renders CommentsNotFound when no comments are available', () => {
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            data: { comments: [], total: 0 },
            loading: false,
        })

        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        expect(screen.getByText('Comments not found.')).toBeInTheDocument()
        expect(screen.getByText('All Comments: 0')).toBeInTheDocument()
    })

    test('fetchComments is called when no comments are in localStorage', () => {
        const fetchCommentsMock = vi.spyOn(commentSlice, 'fetchComments').mockReturnValue({
            type: 'comments/fetchComments',
            payload: [],
        } as never)

        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            data: { comments: [], total: 0 },
            loading: false,
        })

        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        expect(fetchCommentsMock).toHaveBeenCalled()
    })

    it('should restore scroll position from localStorage', () => {
        const scrollToMock = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

        Object.defineProperty(window, 'scrollY', { value: 100, writable: true })

        handleScroll()

        vi.spyOn(window.localStorage, 'getItem').mockReturnValue('150')

        const savedScrollPosition = window.localStorage.getItem('scrollPosition')
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10))
        }

        expect(scrollToMock).toHaveBeenCalledWith(0, 100)
    })
})
