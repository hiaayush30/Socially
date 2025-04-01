
function PostSkeleton() {
    return (
        <div className="card w-[95%] p-2 rounded-md bg-blue-200 dark:bg-stone-800 flex items-center justify-start gap-2 flex-col">
            <header className="rounded-lg p-2 w-full flex justify-between gap-3 items-center bg-gradient-to-r dark:from-stone-800 dark:via-stone-700 dark:to-stone-600 from-blue-200 via-blue-100 to-blue-50">
                <div className="flex items-center gap-3 animate-pulse">
                    <div className="bg-gray-400 rounded-full w-14 h-14"></div>
                    <div className="flex flex-col gap-1">
                        <div className="bg-gray-400 h-4 w-24 mb-1"></div>
                        <div className="bg-gray-400 h-3 w-32"></div>
                    </div>
                </div>
                <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
            </header>
            <main className="animate-pulse">
                <div className="bg-gray-400 w-full h-48"></div>
            </main>
            <footer className="relative flex gap-3 items-center justify-start py-3 w-full">
                <div className="flex gap-3 items-center px-2 animate-pulse">
                    <div className="bg-gray-400 w-6 h-6 rounded-full"></div>
                    <div className="bg-gray-400 w-6 h-6 rounded-full"></div>
                    <div className="bg-gray-400 w-6 h-6 rounded-full"></div>
                </div>
                <div className="bg-gray-400 h-3 w-32 absolute bottom-0 right-2"></div>
            </footer>
        </div>

    )
}

export default PostSkeleton
