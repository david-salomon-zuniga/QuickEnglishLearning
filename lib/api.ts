// lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
// Hardcode it temporarily to verify the connection
//export const API_BASE = "http://localhost:7860";

if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables!");
}