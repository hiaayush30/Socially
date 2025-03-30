"use client"
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login Data:", formData);
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
                    <button type="submit" className="bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-400">Login</button>
                </form>
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
