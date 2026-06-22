// app/api/delete-user/route.ts
import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { API_BASE } from '@/lib/api';

export async function DELETE() {
    const cookieStore = await cookies();

    // 1. Crear el cliente de Supabase para validar la sesión actual mediante cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    // 2. Obtener la sesión real de Supabase
    const { data: { session } } = await supabase.auth.getSession();

    // 3. Validar que la sesión exista
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // 4. Llamar al backend usando el token JWT de Supabase
        const goRes = await fetch(`${API_BASE}/api/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}` // Usamos access_token de Supabase
            },
            body: JSON.stringify({ userId: session.user.id })
        });

        if (!goRes.ok) {
            const errorText = await goRes.text();
            console.error("DEBUG: Backend Go error:", errorText);
            return NextResponse.json({ error: "Backend failure: " + errorText }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DEBUG: Fetch error:", err);
        return NextResponse.json({ error: "Network error" }, { status: 500 });
    }
}