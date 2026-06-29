import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Sidebar from "../components/Sidebar"
import Link from "next/link";
import SignOutButton from "../components/SignOutButton"
import ProButton from "../components/ProButton";
import LemonSqueezyScript from "../components/LemonSqueezyScript";
import { API_BASE } from '@/lib/api';
import ProfileButton from "../components/ProfileButton";

// 1. Modifica la función para que use el accessToken en la cabecera
async function getProgress(userId: string, accessToken: string) {
    try {
        const res = await fetch(`${API_BASE}/api/get-progress?userId=${userId}`, {
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                // Usamos el token real del usuario para que tu API de Go lo valide
                "Authorization": `Bearer ${accessToken}`,
                // Opcional: mantén la key solo si la sigues necesitando en el backend
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
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    // Obtener la sesión directamente de Supabase
    const { data: { session } } = await supabase.auth.getSession();

    // 1. Redirección única si no hay sesión
    if (!session) {
        redirect('/login');
    }

    const { user } = session;

    // 2. Acceso a metadatos correctamente

    const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || "User";

    // Add this near the top of your DashboardPage or a new Pricing component
    const PLANS = [
        {
            name: "Monthly",
            price: "$10.00",
            period: "month",
            id: process.env.NEXT_PUBLIC_LS_MONTHLY_VARIANT_ID
        },
        {
            name: "Quarterly",
            price: "$25.00",
            period: "3 months",
            id: process.env.NEXT_PUBLIC_LS_QUARTERLY_VARIANT_ID
        },
        {
            name: "6-Month",
            price: "$45.00",
            period: "6 months",
            id: process.env.NEXT_PUBLIC_LS_SIX_MONTHS_VARIANT_ID
        },
        {
            name: "Annual",
            price: "$80.00",
            period: "year",
            id: process.env.NEXT_PUBLIC_LS_YEARLY_VARIANT_ID
        }
    ];
    //const LEMON_SQUEEZY_ENDPOINT = "https://salomonapps.lemonsqueezy.com/checkout/buy/7201c356-e4cf-46e8-9226-72db59fd19b5";
    //const checkoutUrlWithId = `${LEMON_SQUEEZY_ENDPOINT}?checkout[custom][user_id]=${session?.user?.id}&embed=1`;

    // Asegúrate de extraer el token. 
    // NOTA: Dependiendo de tu configuración de auth, el token podría estar en session.accessToken
    // 4. Extracción segura del token (para tu API de Go)
    const token = session.access_token;
    // Llamada con el token
    let data = await getProgress(user.id, token);
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
                            //checkoutUrl={checkoutUrlWithId}
                            isPro={isProUser}
                            userId={session.user.id} // <-- Cambia user.id por session.user.id
                        />
                        <SignOutButton />
                        <ProfileButton /> {/* Added here */}
                    </div>
                </header>

                <main className="p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-gray-800">
                            Hello, {userName}!
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