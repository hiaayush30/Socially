import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronRightCircleIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
            id: "wihnqw213",
            profilePic: "https://avatar.iran.liara.run/public/boy",
            bio: "wecihewucge"
        },
        {
            username: "bob",
            id: "wihqwn213",
            profilePic: "https://avatar.iran.liara.run/public/boy",
            bio: "wecihewucge"
        }
    ]
    return (
        <div
            className="hidden lg:block w-[25vw] xl:w-[22vw] rounded-lg max-h-[83vh] sticky top-[15vh] p-2
            bg-gradient-to-r dark:from-stone-800 dark:via-[#1e1b4b] dark:to-[#312e81]  from-blue-50 via-blue-200 to-blue-100">
            <div className="flex flex-col justify-center items-center mx-auto h-full">
                <div className="flex flex-col items-start">
                    <h2 className="text-4xl font-semibold">Explore</h2>
                    <h3 className="text-xl my-2">Users you may like to know</h3>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    {users.map(user => {
                        return <div key={user.id}
                            className="flex gap-2 my-5 border-3 border-stone-500 dark:border-stone-400 p-2 rounded-lg">
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
                                <ChevronRightCircleIcon />
                            </Button>
                        </div>
                    })}
                </div>
                <Link href={"/users"}
                    className="flex items-center cursor-pointer mb-2"
                >
                    <div className="relative group cursor-pointer">
                        <span className="text-lg font-medium">Search Users</span>
                        <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-stone-500 transition-all duration-300 group-hover:w-full"></div>
                    </div>

                    <ChevronRight />
                </Link>
            </div>
        </div>
    )
}

export default Recommendations
