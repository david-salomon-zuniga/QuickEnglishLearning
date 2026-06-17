"use client"
import { useState } from "react"

export default function ForgotPasswordPage() {
    // RESOLVED: Define state for email and loading
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }), // RESOLVED: email now exists in scope
            });

            if (res.ok) {
                alert("If that email exists, a reset link has been sent.");
            }
        } catch (error) {
            console.error("Reset request error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleRequestReset} className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-xl mb-4"
                    required
                />
                <button
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-full font-bold"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}