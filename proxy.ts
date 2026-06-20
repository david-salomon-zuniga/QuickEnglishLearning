// proxy.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Next.js espera la exportación por defecto en el archivo proxy
export default auth((req) => {
    const isLandingPage = req.nextUrl.pathname === "/"

    if (isLandingPage) {
        return NextResponse.next()
    }

    const isLoggedIn = !!req.auth
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isRegisterPage = req.nextUrl.pathname === "/register"

    const hasNotAcceptedTerms = req.auth?.user && (req.auth as any).user.termsAccepted === false;

    if (isLoggedIn && hasNotAcceptedTerms) {
        if (!isRegisterPage) {
            return NextResponse.redirect(new URL("/register", req.nextUrl))
        }
        return NextResponse.next()
    }

    if (isDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/login", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    // 🔥 EXCLUSIÓN CORRECTA: Dejamos fuera TODA la carpeta api para evitar el 404 de Auth.js
    // Exclude static assets, but allow /api/delete-user to pass through
    //matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
    // Only run middleware on dashboard or auth-sensitive pages
    matcher: ["/dashboard/:path*", "/login", "/register"],
}