import { supabase } from "@/app/utils/supabase";


import { getSession } from "next-auth/react";

export const updateProgress = async (userId: string, newLevel: number, newStep: number, newSubStep: number, passedToken?: string) => {
    try {
        let token = passedToken;

        // 1. Modificado para respetar "manual_session" en entornos de desarrollo local
        if (!token) {
            const { data } = await supabase.auth.getSession();
            token = data?.session?.access_token;
        }

        // 🔍 DIAGNÓSTICO
        console.log("🕵️‍♂️ [FRONTEND DIAGNOSTIC]:", {
            userIdRecibido: userId,
            TieneUserId: !!userId,
            TokenEncontrado: token,
            EsManual: token === "manual_session"
        });

        // 2. Control de seguridad tolerante a sesiones de desarrollo manuales
        if (!token || !userId) {
            console.warn(`⚠️ [FRONTEND LOG]: Abortado. Motivo: ${!userId ? "Falta el userId. " : ""}${!token ? "Falta el Token. " : ""}`);
            return;
        }

        const payload = {
            userId: userId,
            Level: newLevel,
            Step: newStep,
            Substep: newSubStep
        };

        console.log("✈️ [FRONTEND LOG] Enviando este Payload a Go:", JSON.stringify(payload));

        const response = await fetch('http://localhost:8080/api/progress', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });

        console.log(`📡 [FRONTEND LOG] Respuesta del servidor Go: Status ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update progress: ${errorText}`);
        }

        console.log("✅ [FRONTEND LOG] Petición terminada con éxito.");
    } catch (error) {
        console.error("❌ [FRONTEND LOG] Error grave:", error);
    }
};

// 🔥 Corregido: Ahora acepta passedToken para heredar el token seguro de la sesión de Next-Auth
export const saveEvaluation = async (userId: string, data: any, passedToken?: string) => {
    try {
        let token = passedToken;

        if (!token) {
            const { data: sbData } = await supabase.auth.getSession();
            token = sbData?.session?.access_token;
        }

        const payload = { ...data, user_id: userId };

        const response = await fetch("http://localhost:8080/api/save-evaluation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save evaluation: ${errorText}`);
        }
    } catch (error) {
        console.error("Failed to save evaluation:", error);
        throw error; // Propagar el error para que la UI se entere de la falla
    }
};