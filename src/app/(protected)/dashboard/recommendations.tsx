import { Button } from "@/components/ui/button"
import { ChevronRightCircleIcon } from "lucide-react"
import Image from "next/image"

function Recommendations() {
    const users = [
        {
            username: "bob",
            id: "wihn213",
            profilePic: "https://avatar.iran.liara.run/public/boy",
            bio: "wecihewucge"
        },
        {
            username: "bob",
            id: "wihn213",
            profilePic: "https://avatar.iran.liara.run/public/boy",
            bio: "wecihewucge"
        },
        {
            username: "bob",
            id: "wihn213",
            profilePic: "https://avatar.iran.liara.run/public/boy",
            bio: "wecihewucge"
        }
    ]
    return (
        <div
            className="hidden lg:block w-[22vw] bg-stone-200 dark:bg-stone-700 my-5 rounded-lg max-h-[80vh] sticky top-[15vh] p-5">
            <div className="flex flex-col justify-center items-center mx-auto h-full">
            <h2 className="text-3xl font-semibold">Users you may like to know</h2>
                {users.map(user => {
                    return <div key={user.id}
                    className="flex gap-2 my-5 border-3 border-stone-100 dark:border-stone-400 p-2 rounded-lg">
                        <Image
                            src={user.profilePic}
                            alt="profilePic"
                            height={40}
                            width={40}
                            // className="object-cover"
                        />
                        <div className="px-2">
                            <h4 className="font-semibold">{user.id}</h4>
                            <p className="text-sm">{user.bio}</p>
                        </div>
                        <Button>
                            <ChevronRightCircleIcon/>
                        </Button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Recommendations
