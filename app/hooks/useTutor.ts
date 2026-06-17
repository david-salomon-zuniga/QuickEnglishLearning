// src/app/hooks/useTutor.ts
import { useEffect, useRef, useCallback, SetStateAction, Dispatch } from 'react';
import { MicVAD } from "@ricky0123/vad-web";
import { TutorMetrics, TutorResponse } from "@/app/types/tutor";
import DOMPurify from 'dompurify'; // 🛡️ Importamos DOMPurify para sanitizar outputs de la IA

import { createClient } from '@supabase/supabase-js';

// Asegúrate de importar esto en tu componente
import { useSession } from "next-auth/react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useTutor = (numericLevelId: number, /*onUpdateMetrics: (m: TutorMetrics) => void,*/ isTutorActive: boolean, setIsTutorActive: (active: boolean) => void, isRecordingActive: boolean, setIsRecordingActive: (active: boolean) => void, lessonHistory: string[], setLessonHistory: Dispatch<SetStateAction<string[]>>) => {// <--- Add this) => {

    // ... dentro de tu función:
    const { data: session } = useSession(); // <--- NextAuth ya tiene el token refrescado

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
                const token = session?.accessToken;

                const response = await fetch('http://localhost:8080/api/call-tutor-pipeline', {
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
                    if (shouldListenAfter && isTutorActive && !isExitingRef.current) {
                        setIsRecordingActive(true);
                    }
                    audioRef.current = null;
                    URL.revokeObjectURL(audioUrl);
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

    const handleVerifySpeech = async (audioBuffer: Float32Array) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        try {

            // Get active Supabase token
            // Usamos el token que viene de la sesión de NextAuth (ya sincronizado)
            const token = session?.accessToken;

            const blob = new Blob([new Float32Array(audioBuffer)], { type: 'application/octet-stream' });
            const response = await fetch('http://localhost:8080/api/tutor/verify', {
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

                // Keep charts updated with the result
                /*onUpdateMetrics({
                    score: result.score,
                    successes: result.is_correct ? 1 : 0,
                    mistakes: result.is_correct ? 0 : 1
                });8*/
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

            if (!isTutorActive && vadRef.current) {
                vadRef.current.pause();
            }
        }
    };

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