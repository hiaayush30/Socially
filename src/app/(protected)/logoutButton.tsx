"use client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
function LogoutButton() {
    return (
        <Button onClick={() => signOut({ callbackUrl: "/" })}
            variant={"destructive"}>
            <span className="hidden md:block">Logout</span>
            <LogOut className="size-3 md:size-4" />
        </Button>
    )
}

export default LogoutButton
