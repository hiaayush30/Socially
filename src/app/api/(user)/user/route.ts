import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "@/lib/db";


//get a user's details
export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return Response.json({
                success: false,
                message: "Not Authorized"
            }, { status: 403 })
        }
        const { userId } = await req.json();
        if (!userId) {
            return Response.json({
                success: false,
                message: "Invalid Request:userId required"
            })
        }
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
                        post:true,   //will return the entire post not just id in postId
                        user:{
                            select:{
                                id:true,
                                username:true,
                                profilePic:true,
                            }
                        }
                    }
                },
                retweetedPosts: {
                    select: {
                        id: true,
                        post:true, 
                        user:{
                            select:{
                                id:true,
                                username:true,
                                profilePic:true,
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
            return Response.json({
                success: false,
                message: "user not found"
            }, { status: 400 })
        }
        return Response.json({
            success: true,
            message: "user fetched",
            foundUser
        })
    } catch (error) {
        console.log("error in fetching user:" + error);
        return Response.json({
            success: false,
            message: "Internal server error in fetching user"
        }, { status: 500 })
    }
}