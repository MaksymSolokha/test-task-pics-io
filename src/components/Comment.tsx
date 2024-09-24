import React, { useMemo, useState } from 'react'
import ReactNiceAvatar, { genConfig } from 'react-nice-avatar'
import { useAppDispatch } from '../hooks/redux-hooks.ts'
import { removeComment } from '../redux/slices/commentSlice.ts'

interface User {
    id: number
    username: string
    fullName: string
}

interface CommentCardProps {
    id?: number
    body: string
    postId: number
    likes: number
    user: User
}

const CommentCard: React.FC<CommentCardProps> = ({ likes, user, body, postId, id }) => {
    const config = useMemo(() => {
        return genConfig({ sex: 'man', bgColor: 'blue' })
    }, [])

    const [showMenu, setShowMenu] = useState<number | null>(null)

    const handleMenuToggle = (id: number) => {
        if (showMenu === id) {
            setShowMenu(null)
        } else {
            setShowMenu(id)
        }
    }

    const dispatch = useAppDispatch()

    const handleDelete = (commentId: number) => {
        dispatch(removeComment(commentId))
    }

    return (
        <div>
            <div className="border-b border-gray-200 py-4 flex relative">
                <ReactNiceAvatar
                    id={id?.toString()}
                    className="w-10 h-10 rounded-full mr-4"
                    {...config}
                />
                <div className="flex-1">
                    <h4 className="font-semibold">{user.fullName}</h4>
                    <p className="text-gray-600 text-sm">{body}</p>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                        <span className="mr-4">👍 {likes}</span>
                        <span className="mr-4">{user.username} </span>
                        <span>PostID {postId}</span>
                    </div>
                </div>

                <button
                    className="ml-auto text-gray-500 relative"
                    onClick={() => id && handleMenuToggle(id)}
                >
                    ...
                </button>

                {showMenu === id && (
                    <div className="absolute top-1.5 right-1 bg-white border rounded-lg shadow-lg w-20 z-20">
                        <button
                            className="block w-full px-1 py-1 hover:bg-red-100 text-red-600"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentCard
