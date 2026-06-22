import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const path = req.nextUrl.pathname;

    // 1. ZONA PÚBLICA: Rutas que no requieren ninguna validación
    const isPublicPage = path === "/" || path === "/login" || path === "/register" || path.includes("/auth/callback");
    if (isPublicPage) {
        return NextResponse.next();
    }

    // 2. VERIFICACIÓN DE SESIÓN (Híbrida: NextAuth o Supabase)
    const supabaseSession = req.cookies.get('sb-access-token'); // Asegúrate que el nombre sea el correcto
    const isLoggedIn = !!req.auth || !!supabaseSession;

    // 3. LÓGICA DE PROTECCIÓN (Dashboard)
    const isDashboard = path.startsWith("/dashboard");
    if (isDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // 4. LÓGICA DE NEGOCIO (Términos)
    const hasNotAcceptedTerms = req.auth?.user && (req.auth as any).user.termsAccepted === false;
    if (isLoggedIn && hasNotAcceptedTerms && path !== "/register") {
        return NextResponse.redirect(new URL("/register", req.nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ["/dashboard/:path*"],
}