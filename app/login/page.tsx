"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    /*    const handleGoogleLogin = async () => {
        // Forzamos el flujo de Supabase sin pasar un redirectTo dinámico inicialmente
        // para ver si el error es la URL o el provider.
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) console.error("Error crítico de Supabase:", error);
    };*/

    const handleGoogleLogin = async () => {
        signIn("google", { callbackUrl: "/dashboard" });
    }



    // LoginPage.tsx - MODO LIMPIO
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. NextAuth Sign-In: 
            // authorize() en tu config ya llama a tu API de Go.
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                alert("Invalid email or password");
                return;
            }

            // Si llega aquí, NextAuth YA guardó la sesión y el token en la cookie.
            router.push("/dashboard");

        } catch (error: any) {
            console.error("Auth Error:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 md:p-6 relative">
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium text-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Home
            </Link>

            <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Join our platform</h1>

                <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
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

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-blue-600 hover:underline font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-full font-bold transition shadow-md active:scale-[0.98] ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                            }`}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-400">Register first! To Sign In with Google</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold transition shadow-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer active:scale-[0.98]"
                >
                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
                    Sign in with Google
                </button>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}