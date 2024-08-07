export default function BlogCard() {
    return (
        <div className="flex justify-between items-center p-4 shadow-md rounded-lg w-full max-w-[53rem] hover:cursor-pointer dark:hover:bg-gray-950 dark:hover:bg-opacity-75">
            <h2 className="text-xl">Title</h2>
            <p className="text-gray-500">Date</p>
        </div>
    )
}