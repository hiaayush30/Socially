import { Bookmark, Heart, Repeat, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const post = {
    id: "hcfvbwed",
    caption: "check out this wonderful photo",
    image: "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    likes: 24,
    retweets: 50,
    postedBy: {
        id: "jevbr",
        username: "johnny49",
        profilePic: "https://avatar.iran.liara.run/public/boy"
    }
}

function Post() {
    return (
        <div className="card w-[95%] p-2  rounded-md bg-blue-200 dark:bg-stone-800 flex items-center justify-start gap-2 flex-col">
            <header className="rounded-lg p-2 w-full flex justify-between gap-3 items-center
            bg-gradient-to-r dark:from-stone-800 dark:via-stone-700 dark:to-stone-600 from-blue-200 via-blue-100 to-blue-50">
                <div className="flex items-center gap-3">
                    <Link href={"/profile/" + post.postedBy.id}>
                        <Image
                            className="bg-stone-500 rounded-full hover:scale-105 cursor-pointer"
                            alt="profilePic"
                            src={post.postedBy.profilePic}
                            height={60}
                            width={60}
                        />
                    </Link>
                    <h3 className="overflow-hidden"
                    >{post.caption}
                    </h3>
                </div>
                <Trash2 className="hover:scale-105 hover:text-red-500 cursor-pointer" />
            </header>
            <main>
                {post.image && <Image
                    alt="photo"
                    src={post.image}
                    width={200}
                    height={500}
                    className="w-full h-full"
                />}
            </main>
            <footer className="flex gap-3 items-center justify-center py-3">
                <Heart className="cursor-pointer hover:scale-110 hover:text-red-600" />
                <Repeat className="cursor-pointer hover:scale-110 hover:text-green-600" />
                <Bookmark className="cursor-pointer hover:scale-110 hover:text-blue-600" />
            </footer>
        </div>
    )
}

export default Post
