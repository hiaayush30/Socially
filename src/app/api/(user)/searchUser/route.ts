import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/db";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username') || "";

        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return Response.json({
                success: false,
                message: "Anauthorized"
            }, { status: 403 })
        }
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: username
                }
            },
            select: {
                id: true,
                username: true,
                bio: true,
                profilePic: true
            },
            take: 10  //max of 10 at a time
        })
        
        return Response.json({
            success:true,
            message:"users fetched",
            users
        })
    } catch (error) {
        console.log("error in fetching user:" + error);
        return Response.json({
            success: false,
            message: "Internal server error in fetching users"
        }, { status: 500 })
    }
}