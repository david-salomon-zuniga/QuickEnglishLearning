"use client";
import { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { MicVAD } from "@ricky0123/vad-web"
import { TutorMetrics, LevelContent } from "@/app/types/tutor";
import { useTutor } from "@/app/hooks/useTutor";
import { API_BASE } from '@/lib/api';

// Dentro de AgenticVoicePipeline.tsx
import { useAuthToken } from "@/app/hooks/useAuthToken"; // Tu nuevo hook

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


interface Props {
    isTutorActive: boolean;
    isRecordingActive: boolean;
    setIsTutorActive: (active: boolean) => void;
    setIsRecordingActive: (active: boolean) => void;
    isUserInteracted: boolean; // <--- AGREGADO
    tutorSpeechCount: number;
    MAX_SPEECHES: number;
    setTutorSpeechCount: React.Dispatch<React.SetStateAction<number>>;
    userMistakes: string[];
    setUserMistakes: React.Dispatch<React.SetStateAction<string[]>>;
    lessonHistory: string[];
    setLessonHistory: React.Dispatch<React.SetStateAction<string[]>>;
    numericLevelId: number;
}

// 1. Move the instance variable outside the component scope
let globalVadInstance: any = null;

const AgenticVoicePipeline = ({
    isTutorActive,
    isRecordingActive,
    setIsTutorActive,
    setIsRecordingActive,
    isUserInteracted, // <--- AGREGADO
    tutorSpeechCount,
    MAX_SPEECHES,
    setTutorSpeechCount,
    userMistakes,
    setUserMistakes,
    lessonHistory,
    setLessonHistory,
    numericLevelId,
    //onUpdateMetrics
}: Props) => {

    // --- 1. CALL THE HOOK HERE (Inside the component) ---
    const {
        // Renaming these locally so they don't clash with your props
        stopAudio,
        handleVerifySpeech,
        handleGenerateSpeech,
        currentQuestionRef,
        initializationLockRef,
        vadRef,
        // We can extract these to satisfy the "Cannot find name" errors
        isExitingRef,
        isProcessingRef
    } = useTutor(numericLevelId/*, onUpdateMetrics*/, isTutorActive, setIsTutorActive, isRecordingActive, setIsRecordingActive, lessonHistory, setLessonHistory, isUserInteracted);

    const token = useAuthToken(); // Obtiene el token de la cookie de NextAuth

    const tokenRef = useRef(token);

    const isVadReady = useRef(false); // <--- NUEVO: Flag de control

    // Sincroniza el ref solo cuando el token realmente cambia
    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    // --- 2. RESTORE SYNCINDEXREF ---
    // Since this isn't in the hook yet, we keep it local to fix the error
    const tutorSpeechCountRef = useRef(tutorSpeechCount);

    // 1. En AgenticVoicePipeline.tsx, crea un ref para la función
    const handleVerifySpeechRef = useRef(handleVerifySpeech);

    // 2. Actualiza ese ref cada vez que el hook cambie
    useEffect(() => {
        handleVerifySpeechRef.current = handleVerifySpeech;
    }, [handleVerifySpeech]);


    // Agrega esto en AgenticVoicePipeline.tsx
    useEffect(() => {
        hasTriggeredRef.current = false;
        console.log("🔄 [PIPELINE] Nivel cambiado, disparador reseteado.");
    }, [numericLevelId]);

    const currentLevelContent: LevelContent = {
        level: numericLevelId,
        content: [],
        title: "",
        description: ""
    };

    // THE BRUTAL RESET CIRCUIT BREAKER
    useEffect(() => {
        // AÑADE ESTA LÍNEA: Si la IA está hablando o procesando, no apagues nada
        if (isProcessingRef.current) return;


        if (!isTutorActive) {
            stopAudio(true);
            isProcessingRef.current = false;
            isExitingRef.current = false; // <--- CRITICAL: Reset this immediately
            initializationLockRef.current = null;

            // --- AQUÍ RESETEAS EL DISPARADOR ---
            hasTriggeredRef.current = false;

            if (vadRef.current) {
                vadRef.current.pause();
            }
        }
    }, [isTutorActive, numericLevelId, stopAudio]);


    // This effect runs every time isTutorActive changes.
    // If it changes to false (like when you click Refresh), it runs stopAudio().
    useEffect(() => {
        // If the tutor is turned off, we stop audio regardless of processing state
        if (!isTutorActive) {
            stopAudio();
        }
    }, [isTutorActive, stopAudio]);

    useEffect(() => {
        tutorSpeechCountRef.current = tutorSpeechCount;
    }, [tutorSpeechCount]);

    // Add this to clear history AND locks when the level OR page index changes
    // Keep your existing history/lock cleaner but make it even more aggressive
    /*useEffect(() => {
        setLessonHistory([]);
        setUserMistakes([]);
        initializationLockRef.current = null;
        isExitingRef.current = false;
        isProcessingRef.current = false;
    }, [numericLevelId]); */// Removed tutorSpeechCount from here to prevent loops, let the circuit breaker handle the rest

    const getGreetIntro = () => {
        const intros = [
            "Hi! What’s good?", "What’s the story?", "What’s the deal?", "What’s crackin'?", "What’s the haps?", "What’s new?",
            "Yo! Hi.", "Ayo!", "Heyo!", "Alright?", "How’s it?",
            "How’s it going?", "How’s things?", "How ya doing?", "How ya been?",
            "Yo, bro.", "What’s up, man?",
            "Greetings, homie.", "Yo, G.", "My man!", "Cheers.", "Ey.", "How you living?", "How’s life treating you?", "You good?", "Everything straight?", "Is you good?",
            "How’s the grind?", "How’s the hustle?", "Keeping busy?", "Still out here?", "Staying out of trouble?",
            "Wassup?", "Whaddup?",
            "Whazzup?", "Ahoy!", "What’s the craic?",
            "Look who it is!", "Hey! Hi! If it isn’t my favorite person!", "Long time no see.",
            "What’s the sitch?", "How goes it?", "What’s the vibe check?",
            "You been keeping out of trouble?", "What’s been keeping you busy?", "How’s the family?", "How’s the squad?", "Everything gravy?", "Everything wavy?",
            "Yellow!", "Greetings and salutations.", "Peace and love.", "Stay safe out there.", "Catch you on the flip side."
        ];
        return intros[Math.floor(Math.random() * intros.length)] + " ";
    };

    // Define esto dentro del componente (fuera de cualquier efecto)
    const hasTriggeredRef = useRef(false);

    const triggerTutorFlow = useCallback(async (isActive: boolean, count?: number, manualHistory?: string[]) => {
        // 2. Usamos el argumento 'isActive' que sabemos que es el real en este instante
        console.log("🚦 [PIPELINE] Entrando. Tutor activo:", isActive);        // 1. Check if processing or missing content
        // MODIFICA ESTO:
        // Si la lógica de negocio requiere que el tutor esté activo, 
        // no salgas si esTutorActive es false, porque el cambio de estado 
        // es asíncrono. Confía en isProcessingRef.current únicamente.
        if (isProcessingRef.current) {
            console.warn("⚠️ [PIPELINE] 3. Abortado: isProcessingRef es true");
            return;
        }

        // 1. Si ya se disparó una vez, salimos inmediatamente
        if (hasTriggeredRef.current) {
            console.warn("⚠️ [PIPELINE] 4. Abortado: Ya se disparó previamente");
            return;
        }

        // 2. Marcamos como disparado ANTES de cualquier lógica
        hasTriggeredRef.current = true;
        isProcessingRef.current = true;
        console.log("🚦 [PIPELINE] 5. Bandera de disparo activada.");
        console.log("🚦 [PIPELINE] Disparando por única vez.");

        // Usamos el 'count' que llega por argumento, 
        // pero si es undefined, leemos del ref para mantener la estabilidad.
        const activeCount = count ?? tutorSpeechCountRef.current;
        console.log("🚀 [PIPELINE] 6. Paso actual:", activeCount);

        console.log("🚀 Disparando flujo, paso actual:", activeCount);

        // 2. Determine which history to use (passed-in or state)
        const activeHistory = manualHistory || lessonHistory;

        const studyMaterial = currentLevelContent.content || [];
        const currentBlock: any = studyMaterial[activeCount] || studyMaterial[0];

        // 3. Build the payload
        let payload: any = {
            levelId: numericLevelId,
            title: currentLevelContent.title,
            description: currentLevelContent.description,
            currentStep: count,
            history: activeHistory.slice(-5), // Use the active history here
            specificInstruction: currentBlock?.itemD,
            contextItems: {
                itemA: currentBlock?.itemA,
                itemB: currentBlock?.itemB,
                itemC: currentBlock?.itemC
            }
        };


        // 4. Set Context Logic
        if (numericLevelId <= 3) payload.contextType = "TITLE";
        else if (numericLevelId <= 8) {
            payload.contextType = "WORDS";
            payload.targetWord = currentBlock?.itemA || "the topic";
        } else payload.contextType = "DESCRIPTION";



        try {
            console.log("📡 [PIPELINE] 7. Preparando payload para fetch...");
            // Get active Supabase token
            //const { data: { session } } = await supabase.auth.getSession();
            //const token = session?.access_token;

            if (!tokenRef.current) {
                console.error("No hay token disponible, abortando fetch.");
                return;
            }
            console.log("📡 [PIPELINE] 8. Ejecutando fetch. ¿Tiene token?:", !!tokenRef.current);

            const response = await fetch(`${API_BASE}/api/tutor/get-dynamic-question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenRef.current}` // Ahora sí llegará
                },
                body: JSON.stringify(payload)
            });

            // Verificar si la respuesta es realmente JSON
            console.log("📡 [PIPELINE] 9. Respuesta recibida. Status:", response.status);
            const text = await response.text();
            console.log("📡 [PIPELINE] 10. Cuerpo de respuesta:", text.substring(0, 100));
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("El servidor no devolvió JSON:", text);
                return; // Aborta si no es JSON para no bloquear la app
            }

            //const data = await response.json();

            // FIX: If the backend still sends "Excellent work", we ignore it and use a fallback 
            // to ensure Amy actually asks a question first.
            let questionText = data.question;
            if (questionText.includes("Excellent work") && payload.specificInstruction) {
                questionText = payload.specificInstruction;
            }

            const reconstructedQuestion = getGreetIntro() + questionText;

            currentQuestionRef.current = reconstructedQuestion;

            // CRITICAL: Always set 'shouldListen' to TRUE here so the mic opens
            console.log("🎙️ [PIPELINE] 11. Llamando a handleGenerateSpeech...");
            // Aquí es donde el micro se debe abrir solo cuando termine de hablar
            await handleGenerateSpeech(reconstructedQuestion, true);
            console.log("✅ [PIPELINE] 12. handleGenerateSpeech finalizado.");

        } catch (error) {
            console.error("❌ [PIPELINE] 13. Error en el TRY/CATCH:", error);
            hasTriggeredRef.current = false; // Permite reintento si falló el inicio
        } finally {
            isProcessingRef.current = false;
            console.log("🏁 [PIPELINE] 14. Proceso finalizado.");
        }
    }, [handleGenerateSpeech, numericLevelId, token]);
    //"Reconstruye esta función cada vez que uno de estos valores cambie".


    // 1. UPDATED INITIALIZATION EFFECT
    useEffect(() => {
        // 1. Guardias: Token, motor listo
        if (!tokenRef.current || !isVadReady.current) return;

        // 2. Solo disparamos si isTutorActive es true. 
        // Si el log dice "Active: false", es porque este efecto corre antes 
        // de que el padre termine de actualizar el estado.
        // Solo disparamos si está activo y NO se ha disparado nunca antes
        if (isTutorActive && !hasTriggeredRef.current) {
            console.log("🚀 Primer disparo detectado...");
            //if (!initializationLockRef.current && !isProcessingRef.current) {
            const currentKey = `${numericLevelId}-${tutorSpeechCount}`;
            initializationLockRef.current = currentKey;
            console.log("🚀 Initializing Tutor:", currentKey);
            // PASA isTutorActive explícitamente:
            console.log("🚀 isTutorActive:", isTutorActive);
            triggerTutorFlow(isTutorActive, tutorSpeechCount);
            //}
        }
    }, [isTutorActive/*, tutorSpeechCount*/]); // Añadido 'token' como dependencia

    // EFFECT A: Create the VAD instance once (and only once)

    useEffect(() => {
        const initVAD = async () => {
            // Solo creamos si no existe globalmente
            if (!globalVadInstance) {
                console.log("🛠️ Creating VAD Engine...");
                globalVadInstance = await MicVAD.new({
                    startOnLoad: false,
                    model: "v5",
                    baseAssetPath: "/",
                    onnxWASMBasePath: "/",
                    onSpeechEnd: async (audio) => {
                        if (vadRef.current) vadRef.current.pause();
                        setIsRecordingActive(false);
                        // Usamos .current para garantizar que vemos los estados más frescos
                        await handleVerifySpeechRef.current(audio);
                    },
                });
            }
            // Asignamos la instancia global a la referencia local para que el componente la use
            vadRef.current = globalVadInstance;
            isVadReady.current = true; // <--- Marcamos como listo
            console.log("✅ VAD Ready");
        };

        initVAD();

        // Limpieza: solo pausamos, nunca destruimos la instancia global
        return () => {
            if (vadRef.current) {
                vadRef.current.pause();
            }
        };
    }, []);

    /*    useEffect(() => {
        const createVAD = async () => {
            if (!vadRef.current) {
                console.log("🛠️ Creating VAD Engine...");
                vadRef.current = await MicVAD.new({
                    startOnLoad: false,
                    model: "v5",
                    baseAssetPath: "/",
                    onnxWASMBasePath: "/",
                    // 1.Cuando el VAD detecta el final de tu voz, dispara handleVerifySpeech
                    onSpeechEnd: async (audio) => {
                        // Logic to stop UI during processing
                        if (vadRef.current) vadRef.current.pause();
                        setIsRecordingActive(false);
                        await handleVerifySpeech(audio);
                    },
                });
            }
        };
        createVAD();
    }, []); */



    // EFFECT B: The "Power Switch" (Reacts immediately to state changes)
    useEffect(() => {
        const syncMic = async () => {
            if (!vadRef.current) return;

            // Si estamos procesando (ej. enviando audio a verificar), pausamos siempre
            if (isProcessingRef.current || !isTutorActive) {
                vadRef.current.pause();
                return;
            }

            if (isRecordingActive) {
                try {
                    await vadRef.current.start();
                } catch (e) {
                    console.error("VAD Start Error:", e);
                }
            } else {
                vadRef.current.pause();
            }
        };
        syncMic();
    }, [isRecordingActive, isTutorActive]); // Dependencies ensure this runs when recording toggles

    return null;
};

export default AgenticVoicePipeline;