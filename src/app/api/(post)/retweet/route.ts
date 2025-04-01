import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return Response.json({
            success: false,
            message: "Unauthorized: Invalid request"
        }, { status: 403 });
    }

    try {
        const { postId } = await req.json();
        if (!postId) {
            return Response.json({
                success: false,
                message: "Invalid request: postId required"
            }, { status: 400 });
        }

        // Check if the user already liked the post
        const existingRetweet = await prisma.postRetweet.findFirst({
            where: {
                userId: user.id,
                postId
            }
        });

        if (existingRetweet) {
            // If a like exists, remove it (Unlike the post)
            await prisma.postRetweet.delete({
                where: {
                    id: existingRetweet.id
                }
            });

            return Response.json({
                success: true,
                message: "retweet removed successfully"
            }, { status: 200 });
        } else {
            // If no like exists, create one (Like the post)
            await prisma.postRetweet.create({
                data: {
                    userId: user.id,
                    postId
                }
            });

            return Response.json({
                success: true,
                message: "Post retweeted successfully"
            }, { status: 200 });
        }

    } catch (error) {
        console.error("Error in liking/unliking post:", error);
        return Response.json({
            success: false,
            message: "Internal server error: Could not add/remove retweet"
        }, { status: 500 });
    }
};
