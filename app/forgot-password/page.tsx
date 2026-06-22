"use client"
import { useState } from "react"
import { supabase } from "@/app/utils/supabase"; // Use your existing supabase client
import { API_BASE } from '@/lib/api';

export default function ForgotPasswordPage() {
    // RESOLVED: Define state for email and loading
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            // Ensure this URL is added to your Supabase Dashboard "Redirect URLs"
            redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for the reset link.");
        }
        setLoading(false);
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