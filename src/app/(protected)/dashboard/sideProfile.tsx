"use client"
import { Button } from "@/components/ui/button";
import { UserInterface } from "@/types/schema";
import { ChevronRight, PlusCircle } from "lucide-react";
import Image from "next/image"
import { useState } from "react";
import NewPost from "./createPost";

function SideProfile({ user }: { user: UserInterface }) {
  const [creatingPost, setCreatingPost] = useState(false);
  return (
    <div
      className="hidden w-[25vw] xl:w-[22vw] lg:block my-5 rounded-lg max-h-[80vh] sticky top-[15vh] z-10
      bg-gradient-to-r dark:from-[#312e81] dark:via-[#1e1b4b] dark:to-stone-800 from-blue-100 via-blue-200 to-blue-50">
      <div className="h-full p-2 flex flex-col justify-center items-center gap-3">
        <div className="bg-slate-700 rounded-full">
          <Image
            alt="profilePic"
            src={user.profilePic}
            height={180}
            width={180}
          />
        </div>
        <h2 className="text-3xl">Hello {user.username} 👋</h2>
        <div className="flex flex-col  xl:flex-row items-center gap-6 xl:gap-2">
          <Button onClick={() => setCreatingPost(!creatingPost)}
            className="flex items-center">
            <span className="mt-1">Create Post</span>
            <PlusCircle />
          </Button>
          <Button variant={"outline"} className="flex items-center">
            View Profile
            <ChevronRight />
          </Button>
        </div>
      </div>
      {creatingPost && <NewPost setCreatingPost={setCreatingPost}/>}
    </div>
  )
}

export default SideProfile
