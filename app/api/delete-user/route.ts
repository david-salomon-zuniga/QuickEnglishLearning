import { createClient } from '@supabase/supabase-js';
import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

export async function DELETE() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const goRes = await fetch(`${API_BASE}/api/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            body: JSON.stringify({ userId: session.user.id })
        });

        // Captura el error del backend si existe
        if (!goRes.ok) {
            const errorText = await goRes.text();
            console.error("DEBUG: Backend Go error:", errorText); // ESTO SALDRÁ EN LA CONSOLA DE VERCEL/TERMINAL LOCAL
            return NextResponse.json({ error: "Backend failure: " + errorText }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DEBUG: Fetch error:", err);
        return NextResponse.json({ error: "Network error" }, { status: 500 });
    }
}