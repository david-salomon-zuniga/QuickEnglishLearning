// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from '@supabase/ssr'; // Usa el cliente SSR oficial
import { cookies } from 'next/headers';
import { API_BASE } from '@/lib/api';

export async function POST(request: Request) {
    const cookieStore = await cookies();

    // Crear cliente de Supabase para validar la sesión actual
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value }
            }
        }
    );

    const { data: { session } } = await supabase.auth.getSession();

    // Validamos con la sesión de SUPABASE, no de Auth.js
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ahora enviamos el token de Supabase a tu backend en Go
    const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ userId: session.user.id }),
    });

    const data = await response.json();
    return NextResponse.json(data);
}