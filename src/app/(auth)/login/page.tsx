"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");
        if (error) {
            setErrorMessage(decodeURIComponent(error));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            ...formData,
            callbackUrl: "/dashboard"
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-centerp-4 rounded-lg border-2 p-4 border-stone-400">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        className="p-2 outline-none"
                        type="text"
                        name="username"
                        placeholder="Username" required onChange={handleChange} />
                    <input
                        className="p-2 outline-none"
                        type="password"
                        name="password"
                        placeholder="Password" required onChange={handleChange} />
                    <p className="text-red-500 px-2 text-sm text-center">{
                        errorMessage
                    }</p>
                    <button type="submit" className="bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-400">Login</button>
                </form>
                {/* Login with github */}
                {/* <div className="mt-4 w-full">
                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard"})}
                        className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 0.5C5.373 0.5 0 5.874 0 12.5c0 5.285 3.438 9.768 8.207 11.356.6.11.793-.26.793-.577v-2.235c-3.338.726-4.043-1.438-4.043-1.438-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.204.085 1.837 1.24 1.837 1.24 1.07 1.834 2.805 1.304 3.49.996.107-.776.418-1.305.762-1.605-2.664-.305-5.466-1.333-5.466-5.932 0-1.312.469-2.385 1.238-3.225-.124-.305-.537-1.532.117-3.193 0 0 1.012-.324 3.316 1.23.962-.268 1.993-.4 3.016-.404 1.022.004 2.054.136 3.017.404 2.303-1.554 3.314-1.23 3.314-1.23.656 1.661.243 2.888.12 3.193.77.84 1.237 1.913 1.237 3.225 0 4.612-2.806 5.625-5.479 5.92.429.37.812 1.103.812 2.22v3.293c0 .32.192.693.8.576C20.56 22.266 24 17.785 24 12.5 24 5.874 18.627.5 12 .5z"
                            />
                        </svg>
                        Login with GitHub
                    </button>
                </div> */}
                <div className="my-2">New user?
                    <Link
                        className="text-blue-500 px-2 hover:underline underline-offset-2"
                        href={"/signup"}>signup
                    </Link>
                </div>
            </div>
        </div>
    );
}
