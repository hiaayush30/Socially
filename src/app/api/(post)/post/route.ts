import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return Response.json({
                success: false,
                message: "Unauthorized:Please login again"
            }, { status: 403 })
        }
        const { caption, image, imageKey } = await req.json();
        if (!caption) {
            return Response.json({
                success: false,
                message: "caption required!"
            }, { status: 400 })
        }
        const post = await prisma.post.create({
            data: {
                caption,
                image,
                imageKey,
                postedBy: user.id
            }
        });
        return Response.json({
            success: true,
            message: "posted successfully",
            post
        })
    } catch (error) {
        console.log("error in posting image:" + error);
        return Response.json({
            success: false,
            message: "internal server error"
        }, { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');
        const session = await getServerSession(authOptions);
        const user = session?.user;

        if (!user || !postId) {
            return Response.json({
                success: false,
                message: "postId required/Not Authorized"
            }, { status: 403 })
        }

        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        })
        if (!post) {
            return Response.json({
                success: false,
                message: "post not found"
            }, { status: 403 })
        }
        else if (post.postedBy !== user.id) {
            return Response.json({
                success: false,
                message: "cannot delete someone else's post"
            }, { status: 400 })
        }
        await prisma.post.delete({
            where: {
                id: postId
            }
        })
        return Response.json({
            success: true,
            message: "Post deleted"
        }, { status: 201 })
    } catch (error) {
        console.log("error in fetching user:" + error);
        return Response.json({
            success: false,
            message: "Internal server error in deleting post"
        }, { status: 500 })
    }
}