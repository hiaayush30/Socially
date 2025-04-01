import prisma from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/options";

export const GET = async (req: Request) => {
    // const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const skip = Number(searchParams.get("skip")) || 0;

    // if (!session) {
        
        // return Response.json({
        //     success: false,
        //     message: "Unauthorized:Invalid Request"
        // }, { status: 403 })
    // } else {
        try {
            const posts = await prisma.post.findMany({
                take: 5,
                skip,
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
            })
            return Response.json({
                success: true,
                message: "posts fetched successfully",
                posts
            })
        } catch (error) {
            console.log("error in getting posts:" + error);
            return Response.json({
                success: false,
                message: "Internal Server Error:could not fetch posts"
            }, { status: 500 })
        }
    }
// }