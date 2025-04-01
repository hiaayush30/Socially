import { Button } from "@/components/ui/button"
import { ApiResponse } from "@/types/apiResponse"
import axios, { AxiosError } from "axios"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

async function Recommendations() {
    interface UserType {
        username: string;
        id: string;
        profilePic: string;
        bio?: string;
    }
    let users: Array<UserType> = [];
    try {
        const res = await axios.get(process.env.DOMAIN+'/api/randomUsers');
        users = res.data?.users;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.log(axiosError.response?.data.message)
    }
    return (
        <div
            className="hidden overflow-auto lg:block w-[25vw] xl:w-[22vw] rounded-lg max-h-[83vh] sticky top-[15vh] p-2
            bg-gradient-to-r dark:from-stone-600 dark:via-stone-700 dark:to-stone-800  from-blue-50 via-blue-200 to-blue-100">
            <div className="flex flex-col justify-center items-center mx-auto h-full">
                <div className="flex flex-col items-start">
                    <h2 className="text-4xl font-semibold">Explore</h2>
                    <h3 className="text-xl my-2">Users you may like to know</h3>
                </div>
                <div className={` ${users.length === 0 ? "justify-between" : "justify-center"} w-full h-full flex flex-col gap-1 items-center`}>
                    {users.map(user => {
                        return <div key={user.id}
                            className="w-full flex justify-between gap-2 my-5 border-3 border-stone-500 dark:border-stone-400 p-2 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Link href={'/profile/' + user.id}>
                                    <Image
                                        src={user.profilePic}
                                        alt="profilePic"
                                        height={40}
                                        width={40}
                                    // className="object-cover"
                                    />
                                </Link>
                                <div className="px-2">
                                    <h4 className="">{user.username}</h4>
                                    <p className="text-sm dark:text-stone-300 text-slate-600">{user.bio ? user.bio : "No bio yet 😔"}</p>
                                </div>
                            </div>
                            <Link href={'/profile/' + user.id}>
                                <Button className="rounded-full">
                                    <ChevronRight className="scale-150" />
                                </Button>
                            </Link>
                        </div>
                    })}
                    {users.length === 0 &&
                        <div className="h-full flex flex-col items-center">
                            <span className="text-slate-400">Error in fetching users</span>
                        </div>
                    }
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
