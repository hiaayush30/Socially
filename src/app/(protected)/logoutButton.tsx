"use client"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        try {
            setLoading(true);
            await signOut({ callbackUrl: "/" })
            toast("Logged out successfully");
        } catch (error) {
            toast("Error in logging out:" + error);
            setLoading(false);
        }
    }
    return (
        <Button onClick={handleLogout}
            variant={"destructive"}>
            {loading ? <Loader2 className="animate-spin size-4" /> :
                <>
                    <span className="hidden md:block">Logout</span>
                    <LogOut className="size-3 md:size-4" />
                </>}
        </Button>
    )
}

export default LogoutButton
