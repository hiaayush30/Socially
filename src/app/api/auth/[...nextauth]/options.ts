import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/db";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Username", type: "text", placeholder: "john" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {  //constructs the jwt token
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.password || !credentials.identifier) {
                    throw new Error("Invalid request!")
                }
                await prisma.$connect();
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: credentials.identifier },
                            { email: credentials.identifier }
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
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
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
        async session({ session, user }) { //this user came from what we returned in the authorize fn
            // This callback modifies the session object that is sent to the client.
            // Runs every time useSession() or getSession() is called on the client.
            // Uses data from the token (not user, since user data is only available on login).
            if (user) {
                session.user.id = user.id;
                session.user.username = user?.username;
                session.user.bio = user.bio;
                session.user.email = user.email;
                session.user.gender = user.gender;
                session.user.createdAt = user.createdAt;
                session.user.updatedAt = user.updatedAt;
                session.user.profilePic = user.profilePic;
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}