import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LanguageModal from "../components/LanguageModal"
import Sidebar from "../components/Sidebar"
import Link from "next/link";
import SignOutButton from "../components/SignOutButton"
import ProButton from "../components/ProButton";
import LemonSqueezyScript from "../components/LemonSqueezyScript";
import { supabase } from "@/app/utils/supabase";
import { API_BASE } from '@/lib/api';

// 1. Modifica la función para que use el accessToken en la cabecera
async function getProgress(userId: string) {
    try {
        const res = await fetch(`${API_BASE}/api/get-progress?userId=${userId}`, {
            cache: 'no-store',
            next: { revalidate: 0 }, // Forzamos revalidación total
            headers: {
                "Content-Type": "application/json",
                "X-Internal-Server-Key": process.env.INTERNAL_SERVER_KEY || ""
            }
        });
        if (!res.ok) return { level: 1, step: 0, substep: 0 };
        return res.json();
    } catch (error) {
        return { level: 1, step: 0, substep: 0 };
    }
}

export default async function DashboardPage() {
    const session = await auth()

    if (!session || !session.user?.id) {
        redirect("/api/auth/signin")
    }

    // Server-side safeguard check for terms approval status
    if ((session.user as any).termsAccepted === false) {
        redirect("/register")
    }

    const LEMON_SQUEEZY_ENDPOINT = "https://salomonapps.lemonsqueezy.com/checkout/buy/7201c356-e4cf-46e8-9226-72db59fd19b5";
    const checkoutUrlWithId = `${LEMON_SQUEEZY_ENDPOINT}?checkout[custom][user_id]=${session?.user?.id}&embed=1`;

    let data = await getProgress(session.user.id);
    // Force level to be at least 1 so the URL is never /pro/0
    let currentLevel = Math.max(1, data.level || 1);
    let currentStep = data.step || 0;
    let currentSubstep = data.substep || 0;
    const isProUser = data.isPro || false;

    const displayPage = currentSubstep + 1;
    const isAtAbsoluteStart = currentLevel === 1 && currentStep === 0 && currentSubstep === 0;

    const queryParams = `?step=${currentStep}&substep=${currentSubstep}`;
    const learningPath = isProUser
        ? `/dashboard/level/pro/${currentLevel}${queryParams}`
        : `/dashboard/level/${currentLevel}${queryParams}`;

    // Link for the new practice mode
    // FIXED: This matches your folder structure: apps/web/frontend/app/dashboard/level/practice/page.tsx
    const practicePath = `/dashboard/practice?level=1`;

    return (
        <div className="relative min-h-screen bg-gray-50 overflow-x-hidden">
            {/*<LanguageModal />*/}
            <Sidebar />

            <div className="w-full flex flex-col min-h-screen z-0 pl-12">
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                    <div className="font-medium text-gray-700">Dashboard</div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <ProButton
                            checkoutUrl={checkoutUrlWithId}
                            isPro={isProUser}
                            userId={session.user.id} // <-- Cambia user.id por session.user.id
                        />
                        <SignOutButton />
                    </div>
                </header>

                <main className="p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-gray-800">
                            Hello, {session.user?.name}!
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Link href={learningPath}>
                                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-400 transition cursor-pointer h-full">
                                    <span className="text-5xl block mb-4">🎮</span>
                                    <h3 className="font-bold text-2xl">
                                        {isProUser ? "Start AI Tutor (Pro)" : "Start Learning"}
                                    </h3>

                                    <p className="text-gray-500">
                                        {isAtAbsoluteStart
                                            ? "Begin your journey! Click here to start Level 1."
                                            : `Continue Level ${currentLevel}: You are on page ${displayPage}.`
                                        }
                                    </p>
                                </div>
                            </Link>

                            <div className="grid grid-cols-1 gap-6">
                                {/* New Practice Card */}
                                <Link href={practicePath}>
                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-400 transition cursor-pointer flex items-center gap-6">
                                        <span className="text-4xl">🎯</span>
                                        <div>
                                            <h3 className="font-bold text-xl">Practice</h3>
                                            <p className="text-gray-500 text-sm">Review with "Mark with X" exercises.</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Statistics Card */}
                                <Link href="/dashboard/statistics">
                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-400 transition cursor-pointer flex items-center gap-6">
                                        <span className="text-4xl">📊</span>
                                        <div>
                                            <h3 className="font-bold text-xl">Statistics</h3>
                                            <p className="text-gray-500 text-sm">Review your vocabulary mastery.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* Pass the userId to the script so it can handle the reset logic */}
            <LemonSqueezyScript userId={session.user.id} />
        </div>
    )
}