import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { supabase } from "@/app/utils/supabase"
import { API_BASE } from '@/lib/api';

export async function POST() {
    const session = await auth()
    // Check for both session AND the specific user ID
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Extraemos la sesión activa de Supabase para obtener el token JWT
    const { data: { session: sbSession } } = await supabase.auth.getSession();
    const token = sbSession?.access_token;

    // Now TypeScript knows session.user.id is a string
    const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ userId: session.user.id }),
    })

    const { url } = await response.json()
    return NextResponse.json({ url })
}