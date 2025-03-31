import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

function NewPost({
    setCreatingPost
}: { setCreatingPost: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="bg-stone-800/90 fixed inset-0 z-20 flex justify-center items-center">
            <Button onClick={() => setCreatingPost(false)}
                variant={"destructive"}
                className="absolute top-2 right-2">
                <Trash2 className="size-5" />
            </Button>
            <div className="bg-stone-200 text-stone-700 min-h-[50vh] w-[50vw] rounded-lg p-6 flex justify-center items-center">
                Hello There
            </div>

        </div>
    )
}

export default NewPost
