import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            username: string,
            id: string;
            profilePic: string;
            bio: string;
            gender: "male" | "female";
            createdAt: Date;
            updatedAt: Date;
        } & DefaultSession['user']
    }
    interface User {
        id: string;
        email: string;
        username: string,
        profilePic: string;
        bio: string;
        gender: "male" | "female";
        createdAt: Date;
        updatedAt: Date;
    }

}