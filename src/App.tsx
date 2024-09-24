import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks.ts'
import { useEffect } from 'react'
import { fetchComments } from './redux/slices/commentSlice.ts'
import Comment from './components/Comment.tsx'
import Input from './components/Input.tsx'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchComments())
    }, [])

    const { data } = useAppSelector((state) => state.comments)

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="bg-white rounded-lg p-4 shadow-md max-w-lg mx-auto">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-lg">Comments</h3>
                </div>
                <Input />
                {data?.comments.map((comment) => <Comment key={comment.id} {...comment} />)}
            </div>
        </div>
    )
}

export default App
