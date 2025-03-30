import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth"

async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      Dahsboard
      <h3>{JSON.stringify(session?.user)}</h3>
    </div>
  )
}

export default Dashboard
