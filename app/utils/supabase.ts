import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase environment variables are missing!");
}

// 1. Instancia global (para usar en componentes normales)
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// 2. Función para crear cliente (necesaria para el callback de Auth)
export const createClient = () => {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};