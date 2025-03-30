import zod from "zod";

export const signUpSchema = zod.object({
    email: zod.string().email(),
    username: zod.string().min(2, { message: "minimum 2 characters required" }).max(10, { message: "max 10 characters allowed" }),
    password: zod.string().min(2, { message: "minimum 2 characters required" }),
    gender: zod.enum(["male", "female"], { message: "invalid gender type" })
})

export const SignInSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

export interface UserInterface {
    id: string;
    username: string;
    email: string;
    bio: string;
    gender: "male" | "female";
    profilePic: string;
    updatedAt: Date;
    createdAt: Date
}