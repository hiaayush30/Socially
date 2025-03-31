"use client"
import Image from "next/image"
import { ModeToggle } from "../ModeToggle"
import { Button } from "../ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

function Header() {
  const router = useRouter();
  return (
    <header className="h-[10vh] items-center px-5 flex justify-between fixed top-0 w-full bg-muted/50 backdrop-blur-md border-b">
      <Link href={"/"}>
        <Image
          className="rounded-lg"
          src={"/logo.png"}
          alt="Socially logo"
          height={30}
          width={80} />
      </Link>
      <div className="flex items-center gap-2 md:gap-5">
        <Button onClick={() => router.push("/login")}
          variant={"outline"}>Login</Button>
        <Button onClick={() => router.push("/signup")}
        >Signup</Button>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
