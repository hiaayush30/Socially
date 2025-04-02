"use client"
import { Bookmark, Heart, Repeat, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PostType } from "../../app/(protected)/dashboard/allPosts"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import axios from "axios"
import { useEffect, useState } from "react"
import PostSkeleton from "./postSeketon"


function Post({ post }: { post: PostType }) {
    const session = useSession();

    const user = session.data?.user;
    const [loading, setLoading] = useState(false);

    const postLikedOrNot = () => {
        if (post.likedBy.some(like => like.userId === user?.id)) {
            setPostLiked(true);
        } else {
            setPostLiked(false);
        }
    }

    const postRetweetedOrNot = () => {
        if (post.retweetedBy.some(retweet => retweet.userId === user?.id)) {
            setRetweeted(true);
        } else {
            setRetweeted(false);
        }
    }

    const [postLiked, setPostLiked] = useState<boolean>(false)
    const [retweeted, setRetweeted] = useState<boolean>(false);

    useEffect(() => {
        postLikedOrNot();
        postRetweetedOrNot();
    }, [session.data?.user])

    const handleLike = async () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);

        try {
            const newLikeState = !postLiked; // Determine new state before updating
            setPostLiked(newLikeState);

            await axios.post("/api/like", { postId: post.id });
            toast(newLikeState ? "Post liked" : "Post unliked");
        } catch (error) {
            console.log(error);
            toast("Something went wrong");
            setPostLiked((prev) => !prev); // Revert state if request fails
        } finally {
            setLoading(false);
        }
    };

    const [deleted, setDeleted] = useState(false);
    const handleDelete = async () => {
        try {
            await axios.delete('/api/post?postId=' + post.id);
            toast('post deleted');
            setDeleted(true);
        } catch (error) {
            console.log(error);
            toast("Something went wrong")
        }
    }

    const handleRetweet = async () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);

        try {
            const newRetweetState = !retweeted; // Determine new state before updating
            setRetweeted(newRetweetState);

            await axios.post("/api/retweet", { postId: post.id });

            toast(newRetweetState ? "Post retweeted" : "Retweet removed");
        } catch (error) {
            console.log(error);
            toast("Something went wrong");
            setRetweeted((prev) => !prev); // Revert state if request fails
        } finally {
            setLoading(false);
        }
    };

    const handleBookmark = async () => {
        toast("Feature comming soon 😊")
    }

    if (session.status == "loading") return (
        <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </>
    );
    return (
        <div className={`${deleted ? "hidden" : ""} w-[95%] p-2  rounded-md bg-blue-200 dark:bg-stone-800 flex items-center justify-start gap-2 flex-col`}>
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
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-sm">{post.user.username}</h2>
                        <h3 className="overflow-hidden"
                        >{post.caption}
                        </h3>
                    </div>
                </div>
                {post.user.id === user?.id && <Trash2 onClick={handleDelete}
                    className="hover:scale-105 hover:text-red-500 cursor-pointer" />}
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
            <footer className="relative flex gap-3 items-center justify-start py-3 w-full">
                <div className="flex gap-3 items-center px-2">
                    <button disabled={loading}>
                        <Heart
                            onClick={handleLike}
                            className={`${postLiked ? "text-white bg-red-600 rounded-full p-1" : "hover:text-red-600"} cursor-pointer hover:scale-110`}
                        />
                    </button>
                    <button disabled={loading}>
                        <Repeat
                            onClick={handleRetweet}
                            className={`${retweeted ? "text-white bg-green-600 rounded-full p-1" : "hover:text-green-600"} cursor-pointer hover:scale-110`}
                        />
                    </button>
                    <button disabled={loading}>
                        <Bookmark
                            onClick={handleBookmark}
                            className={`cursor-pointer hover:scale-110 hover:text-blue-600`}
                        />
                    </button>
                </div>
                <div className="absolute bottom-0 right-2 text-sm text-slate-500">
                    {new Date(post.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </div>
            </footer>
        </div>
    )
}

export default Post
