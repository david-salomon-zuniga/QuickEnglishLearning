// src/app/hooks/useTutor.ts
import { useEffect, useRef, useCallback, SetStateAction, Dispatch } from 'react';
import { MicVAD } from "@ricky0123/vad-web";
import { TutorMetrics, TutorResponse } from "@/app/types/tutor";
import DOMPurify from 'dompurify'; // 🛡️ Importamos DOMPurify para sanitizar outputs de la IA

import { createClient } from '@supabase/supabase-js';

// Asegúrate de importar esto en tu componente
import { supabase } from "@/app/utils/supabase";
import { API_BASE } from '@/lib/api';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const useTutor = (
    numericLevelId: number,
    isTutorActive: boolean,
    setIsTutorActive: (active: boolean) => void,
    isRecordingActive: boolean,
    setIsRecordingActive: (active: boolean) => void,
    lessonHistory: string[],
    setLessonHistory: Dispatch<SetStateAction<string[]>>
) => {



    // Sync the local state with the external prop
    useEffect(() => {
        setIsTutorActive(isTutorActive);
    }, [isTutorActive]);


    const vadRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentQuestionRef = useRef<string>("");
    const isProcessingRef = useRef(false);
    const isExitingRef = useRef(false);
    const initializationLockRef = useRef<string | null>(null);

    const handleGenerateSpeech = (text: string, shouldListenAfter: boolean = true) => {
        return new Promise<void>(async (resolve) => {
            if (!isTutorActive && !isExitingRef.current) return resolve();

            // NUEVO LOG: Confirmar que el texto llegó a la función de síntesis
            console.log("🎙️ [DEBUG SYNTH] Iniciando síntesis con texto:", text ? text.substring(0, 50) + "..." : "VACÍO");

            if (!text || text.trim() === "") {
                console.error("❌ [DEBUG SYNTH] Bloqueado: Texto vacío");
                return resolve();
            }

            try {

                // Get active Supabase token
                // Usamos el token que viene de la sesión de NextAuth (ya sincronizado)
                const { data } = await supabase.auth.getSession();
                const token = data.session?.access_token;

                const response = await fetch(`${API_BASE}/api/call-tutor-pipeline`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    },
                    body: JSON.stringify({ text })
                });

                if (!response.ok) throw new Error("TTS Backend Error");

                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audioRef.current = audio;

                audio.onended = () => {
                    audioRef.current = null;
                    URL.revokeObjectURL(audioUrl);

                    // 2. REACTIVACIÓN PRECISA DEL VAD
                    if (vadRef.current) {
                        console.log("🎙️ IA terminó de hablar. Reactivando VAD...");
                        vadRef.current.start();
                    }

                    if (shouldListenAfter && isTutorActive && !isExitingRef.current) {
                        setIsRecordingActive(true);
                    }
                    isExitingRef.current = false; // Agrega esto
                    resolve();
                };

                audio.onerror = (e) => {
                    console.error("🔴 [ERROR] Error de Audio:", e); // <--- ESTO te dirá si el archivo es inválido
                    audioRef.current = null;
                    URL.revokeObjectURL(audioUrl);
                    resolve();
                };

                await audio.play();
            } catch (error) {
                resolve();
            }
        });
    };

    const stopAudio = useCallback((force: boolean = false) => {
        if (force) {
            isExitingRef.current = false;
            isProcessingRef.current = false;
        }

        if (!isExitingRef.current) {
            isProcessingRef.current = false;
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }

        setIsRecordingActive(false);
    }, [setIsRecordingActive]);

    const handleVerifySpeech = useCallback(async (audioBuffer: Float32Array) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        try {

            // Get active Supabase token
            // Usamos el token que viene de la sesión de NextAuth (ya sincronizado)
            // 1. Obtener sesión de Supabase
            const { data: { session } } = await supabase.auth.getSession();

            // 2. Validación crítica
            if (!session?.access_token) {
                console.warn("⚠️ No hay token disponible, abortando fetch.");
                // IMPORTANTE: Debes liberar el flag antes de salir
                isProcessingRef.current = false;
                return; // Aborta la ejecución aquí
            }


            // 3. Usa 'session.access_token' directamente, no 'data.session'
            const token = session.access_token;
            const blob = new Blob([new Float32Array(audioBuffer)], { type: 'application/octet-stream' });

            const response = await fetch(`${API_BASE}/api/tutor/verify`, {
                method: 'POST',
                body: blob,
                headers: {
                    'X-Tutor-Context': currentQuestionRef.current.replace(/[^\x00-\x7F]/g, ""),
                    ...(token && { 'Authorization': `Bearer ${token}` })
                }
            });

            // --- SOLUCIÓN: Verifica el estatus antes de JSON ---
            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Error del servidor:", errorText);
                throw new Error(errorText || "Error en la petición");
            }

            const result: TutorResponse = await response.json();

            // NUEVO LOG: Ver qué devolvió Groq exactamente
            console.log("🔍 [DEBUG VERIFY] Resultado recibido:", result);


            // 🛡️ CAPA DE SANITIZACIÓN: Limpiar el análisis crudo de la IA antes de insertarlo en el historial
            let rawAnalysis = result.analysis || "...";
            const isClient = typeof window !== 'undefined';
            const cleanAnalysis = isClient ? DOMPurify.sanitize(rawAnalysis) : rawAnalysis;

            setLessonHistory(prev => [...prev, `Amy: ${currentQuestionRef.current}`, `Analisis: ${cleanAnalysis}`]);

            if (result.analysis) {
                console.log("🗣️ [DEBUG VERIFY] Preparando voz para análisis:", result.analysis);
                isExitingRef.current = true;
                await handleGenerateSpeech(result.analysis, false);
                await new Promise(res => setTimeout(res, 500));

            } else {
                console.warn("⚠️ [DEBUG VERIFY] result.analysis venía vacío o null");
            }

            initializationLockRef.current = null;
            setIsRecordingActive(false);
            setIsTutorActive(false);

        } catch (error) {
            // Silenced console.log, only keeping functional error tracking
        } finally {
            isProcessingRef.current = false;
            isExitingRef.current = false;

            if (vadRef.current) {
                console.log("🔇 Pausando VAD tras verificación...");
                vadRef.current.pause();
            }
        }
    }, [numericLevelId]); // Solo cambia si el nivel cambia

    return {
        isTutorActive,
        setIsTutorActive,
        isRecordingActive,
        setIsRecordingActive,
        lessonHistory,
        setLessonHistory,
        stopAudio,
        handleVerifySpeech,
        handleGenerateSpeech,
        currentQuestionRef,
        initializationLockRef,
        vadRef,
        isProcessingRef,
        isExitingRef
    };
};