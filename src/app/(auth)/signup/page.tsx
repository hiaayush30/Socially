import Link from "next/link";
import Form from "./form";

export default function SignupPage() {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-stone-400">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <Form/>
                <div className="my-2">Already a user?
                    <Link
                        className="text-blue-500 px-2 hover:underline underline-offset-2"
                        href={"/login"}>login
                    </Link>
                </div>
            </div>
        </div>
    );
}
