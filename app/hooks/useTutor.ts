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

    // Inside useTutor.ts
    const isAbortedRef = useRef(false);
    const isTutorActiveRef = useRef(isTutorActive);

    // En tu hook useTutor:
    const abortControllerRef = useRef<AbortController | null>(null);

    // Keep the ref in sync with the state
    useEffect(() => {
        isTutorActiveRef.current = isTutorActive;
    }, [isTutorActive]);

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
    const hasTriggeredRef = useRef<boolean>(false);

    const handleGenerateSpeech = (text: string, shouldListenAfter: boolean = true) => {
        return new Promise<void>(async (resolve) => {

            // Crear nuevo controlador para esta ejecución
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            // 1. Pausar VAD de forma contundente ANTES de generar audio
            if (vadRef.current) vadRef.current.pause();


            // Por esto (que es más permisivo durante el flujo):
            if (!isTutorActive && !isExitingRef.current) {
                console.warn("⚠️ [DEBUG SYNTH] Bloqueado: isTutorActive es falso");
                return resolve();
            }

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

                if (signal.aborted) return; // Salir si se canceló

                // 1. VALIDACIÓN DE ESTADO
                if (!response.ok) {
                    console.error("❌ Error de servidor:", response.status);
                    // IMPORTANTE: Liberar los flags de bloqueo para que el usuario pueda reintentar
                    isProcessingRef.current = false;
                    isExitingRef.current = false;
                    setIsRecordingActive(false);
                    return;
                }

                // 2. VALIDACIÓN DE TIPO MIME
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("audio")) {
                    console.error("❌ El servidor no devolvió audio. Tipo recibido:", contentType);
                    return; // <--- AQUÍ DETIENES EL ERROR
                }

                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                // ESTO ES LO QUE NECESITAS VER
                console.log("DEBUG: Tipo de archivo recibido:", audioBlob.type);
                console.log("DEBUG: Tamaño del archivo:", audioBlob.size, "bytes");

                if (audioBlob.size < 100) { // Un audio de 1 segundo debería tener más bytes
                    console.error("❌ ERROR CRÍTICO: El servidor devolvió un archivo vacío.");
                    isProcessingRef.current = false; // Importante: liberar el bloqueo
                    hasTriggeredRef.current = false; // Permitir que se dispare de nuevo
                    setIsRecordingActive(false);
                    return;
                }


                // En handleGenerateSpeech, ANTES de crear el nuevo Audio
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null; // Destruye el anterior antes de crear el nuevo
                }

                const audio = new Audio(audioUrl);
                audioRef.current = audio;

                // Acceso global directo
                const isAuthorized = (window as any).isUserAuthorizedForAudio === true;

                audio.onplay = () => {
                    setIsRecordingActive(false); // Asegura que el VAD no intente arrancar
                };

                // Esperar a que el audio esté listo para sonar
                audio.oncanplaythrough = async () => {
                    console.log("🔊 [DEBUG] Audio listo.");


                    try {
                        // Ahora puedes usar el estado para permitir el play
                        if (isAuthorized && !isTutorActive) {
                            audio.play().catch(e => console.warn("Autoplay bloqueado:", e));
                        }
                    } catch (err) {
                        console.error("❌ Autoplay bloqueado:", err);
                        // SI FALLA EL AUTOPLAY, NO CAMBIES A RECORDING, FUERZA SALIDA
                        setIsRecordingActive(false);
                        resolve();
                    }
                };

                audio.onended = () => {
                    console.log("✅ [DEBUG] Audio terminado.");
                    console.log("✅ [DEBUG] Audio shouldListenAfter:", shouldListenAfter);
                    console.log("✅ [DEBUG] Audio isTutorActive:", isTutorActive);
                    console.log("✅ [DEBUG] Audio isExitingRef.current:", isExitingRef.current);
                    console.log("✅ [DEBUG] Audio terminado o interrumpido.", audioRef.current !== audio);
                    // 1. Verificación estricta: ¿Fue este el último audio generado?
                    if (audioRef.current !== audio) return;

                    console.log("✅ [DEBUG] Audio terminado.");

                    // 2. Limpieza
                    audioRef.current = null;
                    URL.revokeObjectURL(audioUrl);

                    // 3. SOLO activar si no hubo error de Autoplay (audio.paused debe ser false si sonó)
                    // O si el audio realmente completó su duración
                    if (shouldListenAfter && isTutorActive) {
                        console.log("🎤 Activando micrófono tras reproducción exitosa.");
                        setIsRecordingActive(true);
                    } else {
                        console.log("✅ ⚠️ Audio bloqueado o interrumpido, NO activando micrófono.", shouldListenAfter, isTutorActive, !isExitingRef.current);
                        console.warn("⚠️ Audio bloqueado o interrumpido, NO activando micrófono.");
                    }
                    resolve();
                };

                audio.onerror = (e) => {
                    console.error("🔴 [ERROR] Error de Audio:", e); // <--- ESTO te dirá si el archivo es inválido
                    audioRef.current = null;
                    URL.revokeObjectURL(audioUrl);
                    resolve();
                };

                // 2. SEGURIDAD: Si el audio tarda, forzamos play tras un pequeño delay
                setTimeout(() => {
                    if (audio.paused) {
                        console.log("⚠️ [DEBUG] Forzando play por timeout...", isAuthorized);
                        // Ahora puedes usar el estado para permitir el play
                        if (isAuthorized && isTutorActive) {
                            audio.play().catch(e => console.warn("Autoplay bloqueado:", e));
                        }
                    }
                }, 1000);
            } catch (error) {
                console.error("❌ [ERROR] Fallo en síntesis:", error);
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log("🛑 Síntesis abortada");
                }
                resolve();
            }
        });
    };

    const stopAudio = useCallback((force: boolean = false) => {
        // 1. Matar el proceso de red (fetch) y promesas pendientes
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        if (force) {
            isExitingRef.current = false;
            isProcessingRef.current = false;
        }

        if (!isExitingRef.current) {
            isProcessingRef.current = false;
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }

        setIsRecordingActive(false);
        setIsTutorActive(false);
        isProcessingRef.current = false;
        // Reset the flag after a short delay to allow future interactions
        setTimeout(() => { isAbortedRef.current = false; }, 500);
    }, [setIsRecordingActive, setIsTutorActive]);

    const handleVerifySpeech = useCallback(async (audioBuffer: Float32Array) => {
        console.log("🔍 [VERIFY] Iniciando verificación...");

        if (isProcessingRef.current) {
            console.warn("⚠️ [VERIFY] Abortado: isProcessingRef es true");
            return;
        }
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

            // Check for abort BEFORE starting the voice generation
            if (isAbortedRef.current) {
                console.log("🛑 [ABORTED] Reset detected. Halting pipeline.");
                isProcessingRef.current = false;
                return;
            }

            // NUEVO LOG: Ver qué devolvió Groq exactamente
            console.log("🔍 [DEBUG VERIFY] Resultado recibido:", result);


            // 🛡️ CAPA DE SANITIZACIÓN: Limpiar el análisis crudo de la IA antes de insertarlo en el historial
            let rawAnalysis = result.analysis || "...";
            const isClient = typeof window !== 'undefined';
            const cleanAnalysis = isClient ? DOMPurify.sanitize(rawAnalysis) : rawAnalysis;

            setLessonHistory(prev => [...prev, `Amy: ${currentQuestionRef.current}`, `Analisis: ${cleanAnalysis}`]);
            console.log("isTutorActiveRef.current:", isTutorActiveRef.current);
            if (result.analysis && isTutorActiveRef.current) {
                console.log("isTutorActiveRef.current:", isTutorActiveRef.current);
                console.log("🗣️ [DEBUG VERIFY] Preparando voz para análisis:", result.analysis);
                isExitingRef.current = true;
                await handleGenerateSpeech(result.analysis, false);
                await new Promise(res => setTimeout(res, 500));
                // Solo después de que el audio termine, liberamos el bloqueo
                isProcessingRef.current = false;
                isExitingRef.current = false;
                // Safety check again before finishing
                if (!isTutorActiveRef.current) return;
            } else {
                console.warn("⚠️ [DEBUG VERIFY] result.analysis venía vacío o null");
                // Solo si no hay audio, liberamos de forma normal
                isProcessingRef.current = false;
                isExitingRef.current = false;
            }

            initializationLockRef.current = null;
            setIsRecordingActive(false);
            setIsTutorActive(false);

        } catch (error) {
            // Silenced console.log, only keeping functional error tracking
        } finally {
            // Esto garantiza que el bloqueo se libere aunque haya errores,
            // pero NO pausa el VAD agresivamente aquí.
            isProcessingRef.current = false;
            isExitingRef.current = false;
        }
    }, [numericLevelId, setIsRecordingActive, setIsTutorActive]);

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