// app/utils/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Esta es la instancia que usarás en tus componentes de React ("use client")
export const supabase = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            persistSession: true, // Esto obliga a persistir la sesión
            // Al usar createBrowserClient de @supabase/ssr, 
            // el SDK ya sabe manejar las cookies automáticamente.
        }
    }
);