import SideProfile from "./sideProfile";
import Recommendations from "./recommendations";

async function Dashboard() {
  return (
    <div className="pt-[10vh] flex min-h-screen justify-around">
      <SideProfile />
      <main className="w-[40vw] h-[200vh] bg-orange-500">

      </main>
      <Recommendations />
    </div>
  )
}

export default Dashboard
