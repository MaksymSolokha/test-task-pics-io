import { useRef, useState } from 'react'
import { exportStateToFile, importStateFromFile } from '../helpers/fileManagementActions.ts'
import { useAppDispatch } from '../hooks/redux-hooks.ts'

const FileManagementControl = () => {
    const dispatch = useAppDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = () => {
        if (fileInputRef.current?.files?.[0]) {
            setSelectedFile(fileInputRef.current.files[0])
        }
    }

    const handleImport = () => {
        if (selectedFile) {
            dispatch(importStateFromFile(selectedFile))
            setSelectedFile(null)
        }
    }

    return (
        <div className="flex items-center gap-1 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => dispatch(exportStateToFile())}
            >
                Export State
            </button>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".json"
            />

            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                onClick={() => fileInputRef.current?.click()}
            >
                Choose File
            </button>

            {selectedFile && (
                <div className="flex flex-col items-center">
                    <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        onClick={handleImport}
                    >
                        Import State
                    </button>
                </div>
            )}
        </div>
    )
}

export default FileManagementControl
