import { signUpSchema } from "@/types/schema";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validReq = signUpSchema.safeParse(body);
        if (!validReq.success) {
            return Response.json({
                success: false,
                message: validReq.error.format()
            })
        } else {
            const { email, password, username, gender } = validReq.data;
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username },
                        { email }
                    ]
                }
            });
            if (existingUser) {
                return Response.json({
                    success: false,
                    message: "email or username already exists"
                })
            } else {
                const hashedPassword = bcrypt.hashSync(password, 10);
                await prisma.user.create({
                    data: {
                        username,
                        email,
                        gender,
                        password: hashedPassword,
                        profilePic: gender === "male" ?
                            "https://avatar.iran.liara.run/public/boy?username=" + username :
                            "https://avatar.iran.liara.run/public/girl?username=" + username
                    }
                })
                return Response.json({
                    success: true,
                    message: "Signed up successfully",
                }, { status: 201 })
            }
        }
    } catch (error) {
        console.log("error in registering:" + error);
        return Response.json({
            success: false,
            message: "Something went wrong!"
        }, { status: 500 })
    }
}