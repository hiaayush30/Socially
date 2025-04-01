import { ModeToggle } from "@/components/ModeToggle"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { UserInterface } from "@/types/schema"
import LogoutButton from "./logoutButton"

async function layout({ children }: { children: ReactNode }) {
    const { user } = await getServerSession(authOptions) as { user: UserInterface };
    return (
        <div>
            <header className="h-[10vh] items-center px-5 flex justify-between fixed top-0 w-full bg-blue-100 dark:bg-stone-800/80 backdrop-blur-md border-b">
                <Link href={"/dashboard"}>
                    <Image
                        className="rounded-lg"
                        src={"/logo.png"}
                        alt="Socially logo"
                        height={30}
                        width={80}
                    />
                </Link>
                <div className="flex items-center gap-2 md:gap-5">
                    <ModeToggle />
                    <Link
                        href={"/profile/me"}>
                        <Image
                            className="hover:scale-105"
                            alt="profilePic"
                            src={user.profilePic}
                            height={32}
                            width={32}
                        />
                    </Link>
                    <LogoutButton />
                </div>
            </header>
            {children}
        </div>
    )
}

export default layout
