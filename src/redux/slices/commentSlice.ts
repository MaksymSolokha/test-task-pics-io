import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface CommentsState {
    comments: CommentState[]
    total: number
    skip: number
    limit: number
}

export interface CommentState {
    id: number
    body: string
    postId: number
    likes: number
    user: User
}

export interface User {
    id: number
    username: string
    fullName: string
}

interface initialStateType {
    data: CommentsState | null
    loading: boolean
}

const initialState: initialStateType = {
    data: JSON.parse(localStorage.getItem('comments') || 'null'),
    loading: false,
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    try {
        const response = await axios.get<CommentsState>('https://dummyjson.com/comments')
        return response.data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        throw new Error('Failed to fetch comments')
    }
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        removeComment: (state, action: PayloadAction<number>) => {
            if (state.data) {
                state.data.comments = state.data.comments.filter(
                    (comment) => comment.id !== action.payload
                )
                state.data.total -= 1
                localStorage.setItem('comments', JSON.stringify(state.data))
            }
        },
        addComment: (state, action: PayloadAction<CommentState>) => {
            if (state.data) {
                state.data.comments.unshift(action.payload)
                state.data.total += 1
                localStorage.setItem('comments', JSON.stringify(state.data))
            }
        },
        importState: (state, action: PayloadAction<CommentsState>) => {
            state.data = action.payload
            localStorage.setItem('comments', JSON.stringify(state.data))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.data = { comments: [], total: 0, skip: 0, limit: 0 }
                state.loading = true
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentsState>) => {
                state.data = action.payload
                state.loading = false
                localStorage.setItem('comments', JSON.stringify(state.data)) // Зберігаємо у localStorage після завантаження
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false
                console.error(action.error.message)
            })
    },
})

export const { removeComment, addComment, importState } = commentsSlice.actions
export default commentsSlice.reducer
