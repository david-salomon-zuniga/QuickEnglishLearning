"use client"
import { useState, useMemo } from "react"
import { supabase } from "@/app/utils/supabase";
import Link from "next/link" // ADD THIS IMPORT

export default function RegisterPage() {

    alert("You must accept terms and conditions to complete the registration and use the app.");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
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

        if (agreed && isPasswordValid) {
            setLoading(true);
            try {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) {
                    console.error("Registration failed:", error.message);
                    alert(error.message); // Muestra el error de Supabase (ej: usuario ya existe)
                } else if (data.user) {
                    // Registro exitoso
                    window.location.href = "/dashboard";
                }
            } catch (error) {
                console.error("Auth Error:", error);
            } finally {
                setLoading(false);
            }
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

                    {/* Terms and Conditions Section */}
                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2 font-semibold">Terms and Conditions:</p>
                        <textarea
                            readOnly
                            className="w-full h-32 md:h-40 p-4 text-xs text-gray-600 bg-gray-50 border rounded-lg mb-4 resize-none focus:outline-none"
                            value={`TERMS OF SERVICE AND PRIVACY DISCLOSURE

1. EDUCATIONAL PURPOSES ONLY: This application is a prototype created strictly for learning and demonstration purposes. It is provided "AS-IS" without any warranties regarding functionality, accuracy, or uptime.

2. LIMITATION OF LIABILITY: By using this app, you agree that the developer is NOT responsible for any data loss, system errors, or any damages resulting from the use of this software. You use this platform at your own risk.

3. VOICE & AUDIO DATA: This app uses microphone access for real-time AI processing. We DO NOT retain, store, or share your voice recordings on our servers. All audio processing is handled in-memory and discarded immediately after the session ends.

4. NO DATA GUARANTEES: Features may be added, modified, or removed without notice. We do not guarantee that your progress, vocabulary stats, or account data will be preserved indefinitely.

5. THIRD-PARTY SERVICES: We use Google for authentication and Supabase for data storage. By signing in, you also acknowledge the terms of these third-party providers.

By checking the box below, you release the developer from all liability and confirm you understand the experimental nature of this tool.`}
                        />

                        <div className="flex items-start gap-3 mb-6">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-5 h-5 cursor-pointer"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                                I have read and agree to the Terms of Service and Privacy Policy.
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!agreed || !isPasswordValid || loading}
                        className={`w-full py-4 rounded-full font-bold transition shadow-md active:scale-[0.98]
                            ${(agreed && isPasswordValid && !loading)
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