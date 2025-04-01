import SideProfile from "./sideProfile";
import Recommendations from "./recommendations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserInterface } from "@/types/schema";
import AllPosts from "./allPosts";



async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserInterface;

  return (
    <div className="pt-[10vh] flex min-h-screen justify-around">
      <SideProfile user={user} />
      <main className="w-[80vw] pt-[5vh] md:w-[50vw] lg:w-[40vw]">
        <AllPosts />
      </main>
      <Recommendations />
    </div>
  )
}

export default Dashboard
