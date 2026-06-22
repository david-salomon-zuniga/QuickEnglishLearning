import { createClient } from '@/app/utils/supabase'; // Ajusta tu import
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Redirigir al dashboard tras la autenticación
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}