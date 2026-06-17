"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation" // RESOLVED: Correct import

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    // RESOLVED: Define state for newPassword and loading
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return alert("Invalid or missing token");

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }), // RESOLVED: newPassword now exists
            });

            if (res.ok) {
                alert("Password updated successfully!");
                window.location.href = "/login";
            } else {
                alert("Failed to reset password. The link may have expired.");
            }
        } catch (error) {
            console.error("Reset error:", error);
        } finally {
            setLoading(false);
        }
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
                <button
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-full font-bold"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}