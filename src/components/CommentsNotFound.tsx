export default function CommentsNotFound(): React.JSX.Element {
    return (
        <div className="flex flex-col w-full">
            <h2 className="font-bold text-sm text-center mb-4">Sorry</h2>
            <p className="text-sm text-center mb-3">
                <span className="font-bold" aria-label="searchString-notFound">
                    Comments not found.
                </span>
            </p>
        </div>
    )
}
