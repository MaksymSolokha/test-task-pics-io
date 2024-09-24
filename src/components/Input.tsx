const Input = () => {
    return (
        <div className="border border-blue-300 rounded-lg p-2 flex items-center mb-4 relative">
            <input type="text" placeholder="Hi @John" className="w-full focus:outline-none p-2" />
            <button className="ml-2 px-4 py-2 bg-black text-white rounded-full">Send</button>
        </div>
    )
}

export default Input
