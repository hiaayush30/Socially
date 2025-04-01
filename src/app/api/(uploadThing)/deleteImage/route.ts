import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({ token: process.env.UPLOADTHING_TOKEN });

export async function DELETE(req: NextRequest) {
    try {
        const { imageKey } = await req.json();

        if (!imageKey) {
            return NextResponse.json({ success: false, message: "Image key is required" }, { status: 400 });
        }

        const deleteResponse = await utapi.deleteFiles(imageKey);

        if (!deleteResponse.success) {
            return NextResponse.json({ success: false, message: "Failed to delete image" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
