import { Bookmark, Heart, Repeat, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { PostType } from "./allPosts"

async function Post({ post }: {post:PostType}) {
    const session = await getServerSession(authOptions);
    return (
        <div className="card w-[95%] p-2  rounded-md bg-blue-200 dark:bg-stone-800 flex items-center justify-start gap-2 flex-col">
            <header className="rounded-lg p-2 w-full flex justify-between gap-3 items-center
            bg-gradient-to-r dark:from-stone-800 dark:via-stone-700 dark:to-stone-600 from-blue-200 via-blue-100 to-blue-50">
                <div className="flex items-center gap-3">
                    <Link href={"/profile/" + post.user.id}>
                        <Image
                            className="bg-stone-500 rounded-full hover:scale-105 cursor-pointer"
                            alt="profilePic"
                            src={post.user.profilePic}
                            height={60}
                            width={60}
                        />
                    </Link>
                    <h3 className="overflow-hidden"
                    >{post.caption}
                    </h3>
                </div>
                {post.user.id===session?.user.id && <Trash2 className="hover:scale-105 hover:text-red-500 cursor-pointer" />}
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
