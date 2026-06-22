import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials" // Import this
import { CredentialsSignin } from "next-auth"
import bcrypt from "bcryptjs" // <-- Add this import at the top
import { supabase } from "@/app/utils/supabase";
import { API_BASE } from '@/lib/api';// ADD THIS IMPORT

class UserExistsError extends CredentialsSignin {
    code = "EmailAlreadyInUse"
}
class UserNotFoundError extends CredentialsSignin {
    code = "UserNotRegistered"
}
class InvalidCredentialsError extends CredentialsSignin {
    code = "InvalidPassword"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET, // Add this line explicitly
    // 1. ESTO VA AQUÍ (Fuera de callbacks)
    jwt: {
        encode: async ({ secret, token }) => {
            const jsonwebtoken = require("jsonwebtoken");
            return jsonwebtoken.sign(token, secret);
        },
        decode: async ({ secret, token }) => {
            const jsonwebtoken = require("jsonwebtoken");
            return jsonwebtoken.verify(token!, secret);
        },
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                // Add this line to satisfy TypeScript and allow the flag to pass through
                isRegistration: { label: "isRegistration", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // --- RAMA 1: REGISTRO ---
                if (credentials.isRegistration === "true") {
                    // Al hacer signUp, Supabase devuelve la sesión en authData
                    const { data: authData, error: authError } = await supabase.auth.signUp({
                        email: credentials.email as string,
                        password: credentials.password as string,
                        options: { data: { email_confirmed_at: new Date().toISOString() } }
                    });

                    if (authError) throw authError;

                    // 🔥 EXTRAE EL TOKEN DIRECTAMENTE DE AQUÍ
                    const token = authData.session?.access_token;

                    const res = await fetch(`${API_BASE}/api/upsert-user`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token && { 'Authorization': `Bearer ${token}` })
                        },
                        body: JSON.stringify({ email: credentials.email, terms_accepted: true }),
                    });

                    if (!res.ok) return null;
                    const user = await res.json();
                    return { ...user, token: token }; // Devuelve el token que capturaste
                }

                // --- RAMA 2: LOGIN ---
                // Si es login, Supabase requiere signInWithPassword
                const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                    email: credentials.email as string,
                    password: credentials.password as string,
                });

                if (loginError) return null;

                // 🔥 AQUÍ TIENES EL TOKEN REAL
                const token = loginData.session.access_token;

                const userRes = await fetch(`${API_BASE}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: credentials.email, password: credentials.password }),
                });

                if (!userRes.ok) return null;
                const user = await userRes.json();

                return {
                    ...user,
                    token: token // Este es el valor que recibirá el JWT
                };
            }
        })
    ],
    pages: {
        signIn: "/login", // This tells NextAuth: "Go to my custom /login folder"
    },
    session: {
        strategy: "jwt", // Forces the use of cookies/JWT instead of a database
    },// ADD THIS SECTION:
    trustHost: true,
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production", // Set to false because we are on http (localhost), not https
            },
        },
    },
    callbacks: {
        // ADD THIS BLOCK AT THE TOP OF YOUR CALLBACKS
        // CHANGE THIS SECTION: Use the redirect callback to intercept errors
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        }, async signIn({ user, account }: any) {
            // 1. Credentials no requiere validación extra aquí
            if (account?.provider === "credentials") return true;

            // 2. Google: Confía en los datos que Google te envía
            if (account?.provider === "google") {
                try {
                    const res = await fetch(`${API_BASE}/api/upsert-user`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            terms_accepted: false
                        }),
                    });

                    if (res.ok) return true;

                    // Si llega aquí, es porque tu API de Go devolvió un error (4xx o 5xx)
                    console.error("❌ API de Go rechazó el upsert:", await res.text());
                    return false; // ESTO CAUSA EL 403 ACCESS DENIED
                } catch (error) {
                    console.error("❌ Error de conexión con API de Go:", error);
                    return false;
                }
            }
            return false;
        },
        async jwt({ token, user, account }) {
            // 1. Registro inicial o Login con Google/Credentials
            if (account && user) {
                token.id = user.id;
                token.refreshToken = account.refresh_token || "manual_session";
                token.expiresAt = account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000;

                // Aseguramos que los términos se propaguen
                token.termsAccepted = (user as any).termsAccepted;
                token.accessToken = account.access_token || (user as any).token || "";
            }
            // 3. Rotación lógica (Solo si no tenemos token válido)
            if (!token.accessToken && token.refreshToken && token.refreshToken !== "manual_session") {
                return refreshAccessToken(token);
            }

            return token;
        },

        async session({ session, token }) {
            // Inyectamos el accessToken procesado en el JWT para que esté disponible en el cliente
            session.accessToken = token.accessToken as string;

            // Mantenemos la integridad del objeto user
            if (session.user) {
                session.user.id = token.id as string;
                session.user.termsAccepted = token.termsAccepted as boolean;
            }

            return session;
        },
    },
})

// This is the "Engine" that talks to Google when the key expires
async function refreshAccessToken(token: any) {

    // Safety check: if no token exists, don't even try
    if (!token.refreshToken || token.refreshToken === "manual_session") {
        return token;
    }

    try {
        const url = "https://oauth2.googleapis.com/token"
        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            }),
        })

        const refreshedTokens = await response.json()

        if (!response.ok) throw refreshedTokens;

        const updatedToken = {
            ...token,
            accessToken: refreshedTokens.access_token,
            expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };

        const { data: { session: sbSession } } = await supabase.auth.getSession();
        const sbToken = sbSession?.access_token;

        // Protocol: Sync new token to Supabase via your Go API
        await fetch(`${API_BASE}/api/update-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(sbToken && { 'Authorization': `Bearer ${sbToken}` })
            },
            body: JSON.stringify({
                userId: token.id,
                refresh_token: updatedToken.refreshToken,
            }),
        });

        return updatedToken;
    } catch (error) {
        console.error("Token Rotation Sync Error", error);
        return { ...token, error: "RefreshAccessTokenError" };
    }
}