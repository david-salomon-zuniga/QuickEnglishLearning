"use client"
import { useState, useMemo, useEffect } from "react"
import { supabase } from "@/app/utils/supabase";
import Link from "next/link" // ADD THIS IMPORT

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Password validation logic
    const passwordRequirements = useMemo(() => [
        { label: "8+ characters", test: (pw: string) => pw.length >= 8 },
        { label: "Uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
        { label: "Lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
        { label: "Number", test: (pw: string) => /[0-9]/.test(pw) },
        { label: "Special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
    ], []);

    const isPasswordValid = passwordRequirements.every(req => req.test(password));

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPasswordValid) return;

        setLoading(true);
        try {
            // 1. Attempt to Sign Up
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                // IF ALREADY REGISTERED: Do NOT try to sign in. Just redirect.
                if (error.message.includes("User already registered")) {
                    alert("This email is already registered. Redirecting to password recovery.");
                    window.location.href = "/forgot-password";
                    return;
                }
                // For other errors (like invalid email format)
                alert(error.message);
                return;
            }

            window.location.href = "/dashboard";

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 md:p-6 relative">

            {/* GO BACK TO LANDING PAGE BUTTON */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium text-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Go Back
            </Link>

            <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Real-time Requirement Checklist */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {passwordRequirements.map((req, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${req.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className={`text-[10px] md:text-xs transition-colors ${req.test(password) ? 'text-green-700 font-medium' : 'text-gray-400'}`}>
                                        {req.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isPasswordValid || loading}
                        className={`w-full py-4 rounded-full font-bold transition shadow-md active:scale-[0.98]
                            ${(isPasswordValid && !loading)
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                        `}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    )
}