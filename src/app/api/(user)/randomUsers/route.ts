import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

//get a limited number of users
export const GET = async (req:Request) => {
    const session = await getServerSession(authOptions);
    try {
        const { searchParams } = new URL(req.url);
        const limit = Number(searchParams.get("limit")) || 3; 
        const users = await prisma.user.findMany({
            take:limit,
            orderBy:{
                createdAt:"desc"
            },
            select:{
                id:true,
                username:true,
                profilePic:true,
                bio:true,
                createdAt:true
            },
            where:{
                id:{
                    not:session?.user.id
                }
            }
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