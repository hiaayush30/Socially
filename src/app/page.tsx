import Header from "@/components/landing/Header"
import Hero from "@/components/landing/Hero"
import { getServerSession } from "next-auth"

async function Home() {
  const session = await getServerSession();
  console.log(session?.user);
  return (
    <div>
      <Header/>
      <Hero/>
    </div>
  )
}

export default Home
