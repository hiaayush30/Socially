import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/db";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { UserInterface } from "@/types/schema";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "john" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {  //constructs the jwt token
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.password || !credentials.username) {
                    throw new Error("Invalid request!")
                }
                await prisma.$connect();
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: credentials.username },
                            { email: credentials.username }
                        ]
                    }
                })

                if (user) {
                    if (!bcrypt.compareSync(credentials.password, user.password)) {
                        throw new Error("Password or Username incorrect!")
                    }
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        gender: user.gender,
                        profilePic: user.profilePic,
                        updatedAt: user.updatedAt,
                        createdAt: user.createdAt
                    }
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error("Something went wrong! Please try again later")

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 20 * 24 * 60 * 60 //30 days
    },
    callbacks: {
        async jwt({ token, user, profile }) {
            // The user object is only available when the user logs in. On subsequent requests, the token is used
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.bio = user.bio;
                token.gender = user.gender;
                token.profilePic = user.profilePic;
                token.updatedAt = user.updatedAt;

            }
            else if (profile) {
                const foundUser = await prisma.user.findFirst({
                    where: {
                        email: profile.email
                    }
                })
                if (foundUser) {
                    token.id = foundUser.id;
                    token.username = foundUser.username;
                    token.email = foundUser.email;
                    token.bio = foundUser.bio;
                    token.gender = foundUser.gender;
                    token.profilePic = foundUser.profilePic;
                    token.updatedAt = foundUser.updatedAt;
                }
            }
            return token
        },
        async session({ session, token }) { //this user came from what we returned in the authorize fn
            // This callback modifies the session object that is sent to the client.
            // Runs every time useSession() or getSession() is called on the client.
            // Uses data from the token (not user, since user data is only available on login).
            
            // console.log("token in session:"+token);
            if (token) {
                const data = token as unknown as UserInterface
                session.user.id = data.id;
                session.user.username = data.username;
                session.user.bio = data.bio;
                session.user.email = data.email;
                session.user.gender = data.gender;
                session.user.createdAt = data.createdAt;
                session.user.updatedAt = data.updatedAt;
                session.user.profilePic = data.profilePic;
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}