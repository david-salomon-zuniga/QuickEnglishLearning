import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
    console.log("El middleware está vivo")
    // 1. Si es la ruta de callback, permite el paso inmediato
    if (request.nextUrl.pathname.startsWith('/auth/callback')) {
        return NextResponse.next();
    }

    let response = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return request.cookies.get(name)?.value },
                set(name: string, value: string, options: CookieOptions) {
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // Lógica de protección: Si no hay sesión, al login.
    if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Add this inside your proxy function, after getting the session
    if (session) {
        // Add { cache: 'no-store' } logic or simply use a fresh call
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('terms_accepted')
            .eq('id', session.user.id)
            .single();

        // If there is an error, we stay safe (redirect to terms to be sure)
        if (profileError || !profile) {
            return NextResponse.redirect(new URL('/accept-terms', request.url));
        }

        // Only redirect if NOT accepted and NOT on the page
        if (!profile.terms_accepted && request.nextUrl.pathname !== '/accept-terms') {
            return NextResponse.redirect(new URL('/accept-terms', request.url));
        }
    }


    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth/callback|login).*)']
}