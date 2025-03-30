import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

function layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-center">
            <header className="h-[10vh] items-center px-5 flex justify-between fixed top-0 w-full bg-muted/50 backdrop-blur-md border-b">
                <Link href={"/"}>
                    <Image
                        className="rounded-lg"
                        src={"/logo.png"}
                        alt="Socially logo"
                        height={60}
                        width={150} />
                </Link>
            </header>
            {children}
        </div>
    )
}

export default layout
