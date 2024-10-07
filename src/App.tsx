import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks.ts'
import { useEffect } from 'react'
import { fetchComments } from './redux/slices/commentSlice.ts'
import Comment from './components/Comment.tsx'
import Input from './components/Input.tsx'
import Skeleton from './components/Skeleton.tsx'
import CommentsNotFound from './components/CommentsNotFound.tsx'
import FileManagementControl from './components/FileManagementControl.tsx'

function App() {
    const dispatch = useAppDispatch()
    const { data, loading } = useAppSelector((state) => state.comments)

    const handleScroll = () => {
        localStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    useEffect(() => {
        const savedComments = localStorage.getItem('comments')
        const savedScrollPosition = localStorage.getItem('scrollPosition')

        if (!savedComments || JSON.parse(savedComments).comments.length === 0) {
            dispatch(fetchComments())
        }

        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10))
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [dispatch])

    const renderComments = () => {
        if (loading) {
            return (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            )
        }

        if (data?.comments.length === 0) {
            return <CommentsNotFound />
        }

        return data?.comments.map((comment) => <Comment key={comment.id} {...comment} />)
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="bg-white rounded-lg p-4 shadow-md max-w-lg mx-auto">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-lg">Comments</h3>
                    <h3 className="font-semibold text-lg">All Comments: {data?.total || 0}</h3>
                </div>
                <Input />
                <FileManagementControl />
                {renderComments()}
            </div>
        </div>
    )
}

export default App
