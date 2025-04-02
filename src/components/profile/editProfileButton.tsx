"use client"

import { Edit2 } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"

function EditProfileButton() {
    return (
        <Button onClick={()=>{
            toast("Feature comming soon 😊")
        }}
        variant={"outline"} className='flex items-center'>
            <span>Edit Profile</span>
            <Edit2 className='size03' />
        </Button>
    )
}

export default EditProfileButton
