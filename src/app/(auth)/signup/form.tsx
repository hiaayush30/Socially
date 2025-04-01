"use client"
import { ApiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function Form() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? value : "") : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            return toast("passwords do not match!")
        }
        if (!formData.gender) {
            return toast("Gender required!")
        }
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/register", {
                ...formData
            });
            toast(response.data?.message);
            router.replace("/login");
        } catch (error) {
            console.log(error)
            const axiosError = error as AxiosError<ApiResponse>;
            toast(axiosError.response?.data.message ?? "Something went wrong! Please try again later")
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input className="p-2 outline-none" type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input className="p-2 outline-none" type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input className="p-2 outline-none" type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" value={confirmPassword} className="p-2 outline-none" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />

            <fieldset className="border-2 border-stone-400 p-2 rounded-md mb-2">
                <legend className="px-1">Gender</legend>
                <div className="flex gap-4 justify-around">
                    <label className="flex gap-2">
                        <input className="scale-150"
                            checked={formData.gender == "male"} type="checkbox" name="gender" value="male" onChange={handleChange} />
                        <span>Male</span>
                    </label>
                    <label className="flex gap-2">
                        <input className="scale-150"
                            checked={formData.gender == "female"}
                            type="checkbox" name="gender" value="female" onChange={handleChange} />
                        <span>Female</span>
                    </label>
                </div>
            </fieldset>

            <button type="submit" className="flex items-center justify-center bg-[#52BCE1] text-white p-2 cursor-pointer hover:bg-[#6ec6e4]">
                {loading ? <Loader2 className="animate-spin size-5" /> : 'Sign Up'}
            </button>
        </form>
    )
}

export default Form
