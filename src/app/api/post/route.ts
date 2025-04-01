import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
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
            data:{
                caption,
                image,
                imageKey,
                postedBy:user.id
            }
        });
        return Response.json({
            success:true,
            message:"posted successfully",
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