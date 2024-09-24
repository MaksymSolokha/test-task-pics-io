import { useCallback, useState } from 'react'
import { useAppDispatch } from '../hooks/redux-hooks.ts'
import { addComment } from '../redux/slices/commentSlice.ts'

const Input = () => {
    const [formValues, setFormValues] = useState(() => {
        const savedValues = localStorage.getItem('commentForm')
        return savedValues ? JSON.parse(savedValues) : { username: '', fullName: '', comment: '' }
    })

    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues((prev: { username: string; fullName: string; comment: string }) => {
            const updatedValues = { ...prev, [name]: value }
            localStorage.setItem('commentForm', JSON.stringify(updatedValues))
            return updatedValues
        })
    }

    const handleSubmit = useCallback(() => {
        const { username, fullName, comment } = formValues

        if (username.trim() && fullName.trim() && comment.trim()) {
            const newComment = {
                id: Date.now(),
                body: comment,
                postId: Math.floor(100 + Math.random() * 900),
                likes: 0,
                user: {
                    id: Math.floor(100 + Math.random() * 900),
                    username,
                    fullName,
                },
            }

            dispatch(addComment(newComment))

            setFormValues({ username: '', fullName: '', comment: '' })
            localStorage.removeItem('commentForm')
        }
    }, [formValues, dispatch])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
            className="border border-blue-300 rounded-lg p-2 flex items-center mb-4 relative"
        >
            <div className="flex flex-col mr-auto w-full gap-1">
                <input
                    value={formValues.fullName}
                    onChange={handleInputChange}
                    name="fullName"
                    type="text"
                    placeholder="Name..."
                    className="w-full focus:outline-none p-2 border rounded-lg border-blue-300"
                />
                <input
                    value={formValues.username}
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                    placeholder="Username..."
                    className="w-full focus:outline-none p-2 border rounded-lg border-blue-300"
                />
                <input
                    value={formValues.comment}
                    onChange={handleInputChange}
                    name="comment"
                    type="text"
                    placeholder="Comment..."
                    className="w-full focus:outline-none p-2 border rounded-lg border-blue-300"
                />
            </div>

            <button type="submit" className="ml-2 px-4 py-2 bg-black text-white rounded-full">
                Send
            </button>
        </form>
    )
}

export default Input
