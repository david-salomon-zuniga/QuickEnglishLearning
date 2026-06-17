// lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables!");
}