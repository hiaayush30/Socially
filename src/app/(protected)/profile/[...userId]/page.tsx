import prisma from "@/lib/db";
import UserInfo from "./UserInfo";
import { Prisma } from "@prisma/client";

export type UserType = Prisma.UserGetPayload<{
  where: {
    id: "userId"
  },
  select: {
    id: true,
    username: true,
    profilePic: true,
    bio: true,
    email: true,
    _count: {
      select: {
        posts: true, // Count number of posts user has
        likedPosts: true, // Count number of liked posts
        retweetedPosts: true, // Count number of retweets
      }
    },
    createdAt: true,
    likedPosts: {
      select: {
        id: true,
        // postId: true,
        // userId: true,
        post: true,   //will return the entire post not just id in postId
        user: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          }
        }
      }
    },
    retweetedPosts: {
      select: {
        id: true,
        post: true,
        user: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          }
        }
      }
    },
    posts: {
      select: {
        id: true,
        caption: true,
        imageKey: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    }
  }
}>

async function UserProfile({ params }: { params: any }) {
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId;
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        username: true,
        profilePic: true,
        bio: true,
        email: true,
        _count: {
          select: {
            posts: true, // Count number of posts user has
            likedPosts: true, // Count number of liked posts
            retweetedPosts: true, // Count number of retweets
          }
        },
        createdAt: true,
        likedPosts: {
          select: {
            id: true,
            // postId: true,
            // userId: true,
            post: true,   //will return the entire post not just id in postId
            user: {
              select: {
                id: true,
                username: true,
                profilePic: true,
              }
            }
          }
        },
        retweetedPosts: {
          select: {
            id: true,
            post: true,
            user: {
              select: {
                id: true,
                username: true,
                profilePic: true,
              }
            }
          }
        },
        posts: {
          select: {
            id: true,
            caption: true,
            imageKey: true,
            image: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })
    if (!foundUser) {
      return <div className="pt-[10vh]">
        User not found
      </div>
    }
    return (
      <UserInfo user={foundUser} />
    )
  } catch (error) {
    console.log(error);
    return (
      <div className="pt-[10vh]">
        Something went wrong!Please try again later
      </div>
    )
  }
}

export default UserProfile
