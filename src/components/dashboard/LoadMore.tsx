"use client"
import { useRef, useState } from "react"
import { PostType } from "../../app/(protected)/dashboard/allPosts";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Post from "./post";

function LoadMore({ initialPosts }: { initialPosts: Array<PostType> }) {
    const [loading, setLoading] = useState(false);
    const skipRef = useRef<number>(5);
    const [posts, setPosts] = useState<Array<PostType>>(initialPosts);

    const handleClick = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/posts?skip=' + skipRef.current)
            if (res.data.posts.length === 0) {
                toast("No more posts for today!")
            } else {
                toast("fetched posts successfully")
                setPosts(prev => [...prev, ...res.data.posts]);
                skipRef.current = skipRef.current + 5;
            }
        } catch (error) {
            console.log(error);
            toast("Could not fetch posts")
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {posts && posts.map(post => {
                return <Post key={post.id} post={post} />
            })}
            <Button
                onClick={handleClick}
                variant={"outline"}
                disabled={loading} >
                {loading ? <Loader2 className="size-5 animate-spin" /> : 'Load More'}
            </Button>
        </>
    )
}

export default LoadMore
