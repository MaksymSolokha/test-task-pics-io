import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface CommentState {
    comments: Comment[]
    total: number
    skip: number
    limit: number
}

export interface Comment {
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
    data: CommentState | null
    loading: boolean
}

const initialState: initialStateType = {
    data: JSON.parse(localStorage.getItem('comments') || 'null'), // Відновлюємо з localStorage
    loading: false,
}

// Асинхронна функція для завантаження коментарів з API
export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    try {
        const response = await axios.get<CommentState>('https://dummyjson.com/comments')
        return response.data
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
                state.data.total -= 1 // Зменшуємо загальну кількість коментарів
                localStorage.setItem('comments', JSON.stringify(state.data)) // Оновлюємо localStorage
            }
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            if (state.data) {
                state.data.comments.unshift(action.payload)
                state.data.total += 1
                localStorage.setItem('comments', JSON.stringify(state.data)) // Оновлюємо localStorage
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.data = { comments: [], total: 0, skip: 0, limit: 0 }
                state.loading = true
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentState>) => {
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

export const { removeComment, addComment } = commentsSlice.actions
export default commentsSlice.reducer
