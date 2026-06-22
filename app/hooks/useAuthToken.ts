// hooks/useAuthToken.ts
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Obtener la sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setToken(session?.access_token || null);
        });

        // Escuchar cambios en la autenticación (login/logout/refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setToken(session?.access_token || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return token;
};