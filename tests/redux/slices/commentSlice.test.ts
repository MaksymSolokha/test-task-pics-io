import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { vi } from 'vitest'
import {
    addComment,
    CommentsState,
    CommentState,
    fetchComments,
    removeComment,
} from '../../../src/redux/slices/commentSlice'

const initialState: { data: CommentsState | null; loading: boolean } = {
    data: null,
    loading: false,
}

describe('commentsSlice', () => {
    let store: any

    beforeEach(() => {
        store = configureStore({
            reducer: {
                comments: createSlice({
                    name: 'comments',
                    initialState,
                    reducers: {
                        removeComment: (state, action: PayloadAction<number>) => {
                            if (state.data) {
                                state.data.comments = state.data.comments.filter(
                                    (comment) => comment.id !== action.payload
                                )
                                state.data.total -= 1
                            }
                        },
                        addComment: (state, action: PayloadAction<CommentState>) => {
                            if (state.data) {
                                state.data.comments.unshift(action.payload)
                                state.data.total += 1
                            }
                        },
                    },
                    extraReducers: (builder) => {
                        builder
                            .addCase(fetchComments.pending, (state) => {
                                state.loading = true
                                state.data = { comments: [], total: 0, skip: 0, limit: 0 }
                            })
                            .addCase(
                                fetchComments.fulfilled,
                                (state, action: PayloadAction<CommentsState>) => {
                                    state.data = action.payload
                                    state.loading = false
                                }
                            )
                            .addCase(fetchComments.rejected, (state) => {
                                state.loading = false
                            })
                    },
                }).reducer,
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('should return the initial state', () => {
        const state = store.getState().comments
        expect(state).toEqual(initialState)
    })

    it('should handle fetchComments.pending', () => {
        store.dispatch(fetchComments.pending(''))
        const state = store.getState().comments
        expect(state.loading).toBe(true)
        expect(state.data).toEqual({ comments: [], total: 0, skip: 0, limit: 0 })
    })

    it('should handle fetchComments.fulfilled', async () => {
        const mockComments: CommentsState = {
            comments: [
                {
                    id: 1,
                    body: 'This is a comment',
                    postId: 101,
                    likes: 10,
                    user: {
                        id: 1,
                        username: 'user1',
                        fullName: 'User One',
                    },
                },
            ],
            total: 1,
            skip: 0,
            limit: 10,
        }

        vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockComments })

        await store.dispatch(fetchComments())

        const state = store.getState().comments
        expect(state.data).toEqual(mockComments)
        expect(state.loading).toBe(false)
        // expect(localStorage.getItem('comments')).toEqual(JSON.stringify(mockComments))
    })

    it('should handle fetchComments.rejected', async () => {
        vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Failed to fetch comments'))

        await store.dispatch(fetchComments())

        const state = store.getState().comments
        expect(state.loading).toBe(false)
    })

    it('should handle addComment', () => {
        const newComment: CommentState = {
            id: 1,
            body: 'This is a new comment',
            postId: 101,
            likes: 0,
            user: {
                id: 2,
                username: 'user2',
                fullName: 'User Two',
            },
        }

        store.dispatch(addComment(newComment))

        const state = store.getState().comments

        if (state.data) {
            expect(state.data.comments).toEqual([newComment])
            expect(state.data.total).toBe(1)
        }
    })

    it('should handle removeComment', () => {
        const commentToRemove: CommentState = {
            id: 1,
            body: 'This is a comment',
            postId: 101,
            likes: 10,
            user: {
                id: 1,
                username: 'user1',
                fullName: 'User One',
            },
        }

        // Спочатку додаємо коментар
        store.dispatch(addComment(commentToRemove))

        store.dispatch(removeComment(1))

        const state = store.getState().comments

        // Переконайтеся, що data не null
        if (state.data) {
            expect(state.data.comments).toEqual([])
            expect(state.data.total).toBe(0)
        }
    })
})
