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
    data: null,
    loading: false,
}

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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.data = { comments: [], total: 0, skip: 0, limit: 0 }
                state.loading = true
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentState>) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false
                console.error(action.error.message)
            })
    },
})

export default commentsSlice.reducer
