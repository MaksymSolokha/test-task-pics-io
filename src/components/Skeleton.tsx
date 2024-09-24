const Skeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full h-10 w-10 mr-4"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton
