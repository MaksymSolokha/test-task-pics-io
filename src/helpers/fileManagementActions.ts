import { importState } from '../redux/slices/commentSlice.ts'

export const exportStateToFile = () => (_dispatch: any, getState: any) => {
    const state = getState()
    const blob = new Blob([JSON.stringify(state.comments.data)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'comments.json'
    link.click()

    window.URL.revokeObjectURL(url)
}

export const importStateFromFile = (file: File) => (dispatch: any) => {
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof event.target?.result === 'string') {
            const importedState = JSON.parse(event.target.result)
            dispatch(importState(importedState))
        }
    }

    reader.readAsText(file)
}
