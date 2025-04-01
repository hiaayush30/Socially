import prisma from "@/lib/db";

//get a limited number of users
export const GET = async (req:Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const limit = Number(searchParams.get("limit")) || 0; 
        const users = await prisma.user.findMany({
            take:limit,
            orderBy:{
                createdAt:"desc"
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