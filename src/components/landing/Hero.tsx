import Image from "next/image"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

function Hero() {
    return (
        <section className="pt-[10vh] min-h-screen px-10 flex items-center justify-center gap-10 flex-col md:flex-row md:justify-around">
            <div>
                <h2 className="text-6xl mb-2">No Ads</h2>
                <h2 className="text-6xl mb-2">No Privacy Risks</h2>
                <h4 className="text-md text-stone-500">Connect with your friends and family securely and easily</h4>
                <div className="flex items-center gap-3">
                    <Button variant={"secondary"} className="my-4">Get Started</Button>
                    <Button className="my-4">
                       <span>Explore</span>
                       <ChevronDown className="size-5"/>
                        </Button>
                </div>
            </div>
            <div>
                <Image
                className="object-cover rounded-lg shadow-md shadow-gray-500"
                    src={"/HeroImage.jpg"}
                    alt="Hero Image"
                    height={800}
                    width={320}
                />
            </div>
        </section>
    )
}

export default Hero
