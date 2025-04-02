"use client"
import { Button } from "@/components/ui/button"
import { Loader2, LucideUpload, Trash2 } from "lucide-react"
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import UploadImage from "./uploadImage";

function NewPost({
    setCreatingPost
}: { setCreatingPost: Dispatch<SetStateAction<boolean>> }) {

    const [image, setImage] = useState<string>("");
    const [imageKey, setImageKey] = useState("");
    const [caption, setCaption] = useState("");

    const [closing, setClosing] = useState(false);
    const [posting, setPosting] = useState(false);

    const handleDelete = async () => {
        if (image) {
            try {
                await axios.delete("/api/deleteImage", {
                    data: {
                        imageKey
                    }
                })
                toast("image deleted");
                setImage("");
                setImageKey("");
            } catch (error) {
                toast("image could not be deleted:" + error)
            }
        }
    }

    const handlePost = async () => {
        if (caption.trim().length === 0) {
            return toast("Caption required")
        }
        try {
            setPosting(true);
            const res = await axios.post('/api/post', {
                image,
                imageKey,
                caption
            })
            toast(res.data.message);
            // setPosting(false);
            // setCreatingPost(false);
            window.location.reload();
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast(axiosError.response?.data.message);
            setPosting(false);
        }

    }

    return (
        <div className="bg-stone-800/90 fixed inset-0 z-30 flex justify-center items-center">
            <Toaster />
            <Button disabled={closing} onClick={async () => {
                setClosing(true)
                if (image) {
                    await handleDelete();
                }
                setClosing(false);
                setCreatingPost(false);
            }}
                variant={"destructive"}
                className="absolute top-2 right-2">
                {closing ? <Loader2 className="size-5 animate-spin" /> : <Trash2 className="size-5" />}
            </Button>
            <div className="bg-stone-200 text-stone-700 h-[80vh] xl:h-[50vh] w-[50vw] rounded-lg p-6 flex flex-col xl:flex-row justify-between items-center">
                <div>
                    <h3 className="text-2xl my-2">Caption</h3>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={50}
                        className="border-2 border-stone-500 rounded-md p-1 resize-none outline-none"
                    />
                    <div className="flex items-center gap-5 py-5">
                        <Button disabled={posting} onClick={handlePost}
                            variant={"default"} className="border-2 border-stone-500">
                            {posting ? <span>Posting</span> :
                                <>
                                    <span>Post</span>
                                    <LucideUpload />
                                </>
                            }
                        </Button>
                        {
                            image && <Button
                                disabled={posting}
                                onClick={handleDelete}
                                variant={"secondary"}>Remove Pic</Button>
                        }
                    </div>
                </div>
                <div
                    className={`relative h-full cursor-pointer flex justify-center items-center gap-2 w-[60%] xl:w-[50%] rounded-lg`}>
                    {image ?
                        <Image
                            src={image}
                            alt="image"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                        />
                        : <UploadImage setImage={setImage} setImageKey={setImageKey} />
                    }
                </div>
            </div>

        </div>
    )
}

export default NewPost
