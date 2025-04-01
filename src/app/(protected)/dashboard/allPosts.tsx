import prisma from "@/lib/db";

import { Prisma } from "@prisma/client";
import LoadMore from "../../../components/dashboard/LoadMore";
// import LoadMore from "./LoadMore";

// Infer the return type from Prisma query
export type PostType = Prisma.PostGetPayload<{
  select: {
    id: true;
    caption: true;
    image: true;
    createdAt: true;
    likedBy: {
      select: {
        id: true;
        userId: true;
        postId: true;
      };
    };
    retweetedBy: {
      select: {
        id: true;
        userId: true;
        postId: true;
      };
    };
    user: {
      select: {
        id: true;
        profilePic: true;
        username: true;
      };
    };
  };
}>;


async function AllPosts() {
    let posts;
    try {
        posts = await prisma.post.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc", // Order by createdAt in descending order (latest first)
            },
            select: {
                id: true,
                caption: true,
                image: true,
                createdAt: true,
                likedBy: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true
                    }
                },
                retweetedBy: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        profilePic: true,
                        username: true,
                    }
                },

            }
        });
    } catch (error) {
        console.log("error in fetching posts:" + error);
    }
    if (!posts) {
        return (
            <div className="flex flex-col items-center gap-5 pb-10">
                <div className="pt-[30vh] text-slate-600">No posts to show!</div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center gap-5 pb-10">
            {/* {posts.map(post => {
                return <Post key={post.id} post={post} />
            })} */}
            <LoadMore initialPosts={posts}/>
        </div>
    )
}

export default AllPosts
