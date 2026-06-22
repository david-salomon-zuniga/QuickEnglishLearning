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

    // 1. SI NO HAY SESIÓN: Permite el acceso total. 
    // No redirijas a nadie a menos que tú lo programes específicamente.
    if (!session) {
        return response;
    }

    // 2. SI HAY SESIÓN: Solo aquí protegemos las rutas
    const { data: profile } = await supabase
        .from('profiles')
        .select('terms_accepted')
        .eq('id', session.user.id)
        .single();

    // Si el perfil no tiene terms_accepted en true, Y no estás ya en la página de aceptar, redirige.
    if (profile && !profile.terms_accepted && request.nextUrl.pathname !== '/accept-terms') {
        return NextResponse.redirect(new URL('/accept-terms', request.url));
    }

    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth/callback|login).*)']
}