"use client"
import { useState } from "react"
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Password updated successfully!");
            router.push("/login");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleReset} className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Password</h2>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full p-3 border rounded-xl mb-4"
                    required
                />
                <button disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-full font-bold">
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}