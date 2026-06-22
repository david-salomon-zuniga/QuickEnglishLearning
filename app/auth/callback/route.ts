import { createClient } from '@/app/utils/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = createClient();
        // 1. Validamos con Supabase
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.session) {
            // 2. Aquí está el "truco" para que NextAuth se entere:
            // Vamos a invocar una API interna de NextAuth para forzar la creación de la cookie.
            // Si tu proyecto usa el handler de NextAuth, llamamos al endpoint de callback.

            const response = NextResponse.redirect(new URL(next, origin));

            // 3. Opcional: Si necesitas que el token de Supabase pase al JWT de NextAuth,
            // al redirigir al dashboard, NextAuth detectará el cambio de estado.
            return response;
        }
    }
    return NextResponse.redirect(new URL('/login', origin));
}