"use client";

import { Dispatch, SetStateAction } from "react";
import { UploadButton } from "../lib/uploadThing";
import { toast } from "sonner";

export default function UploadImage({setImage,setImageKey}:{
  setImage:Dispatch<SetStateAction<string>>
  setImageKey:Dispatch<SetStateAction<string>>
}) {
  return (
    <main>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImage(res[0].ufsUrl);
          setImageKey(res[0].key);
          toast("Image uploaded!");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
