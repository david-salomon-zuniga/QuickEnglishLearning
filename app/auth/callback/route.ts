import { createClient } from '@/app/utils/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
        const supabase = createClient();
        // 1. Esto intercambia el código por la sesión de Supabase
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.session) {
            // 2. IMPORTANTE: Aquí Supabase ya creó la cookie _supabase_session_token.
            // NextAuth (si usa la misma base de dominio) podrá leer el estado.
            return NextResponse.redirect(`${origin}/dashboard`);
        }
    }

    // Si falla, enviamos a login
    return NextResponse.redirect(`${origin}/login`);
}