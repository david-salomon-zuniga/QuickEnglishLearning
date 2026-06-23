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
    tutorSpeechCount: number;
    MAX_SPEECHES: number;
    setTutorSpeechCount: React.Dispatch<React.SetStateAction<number>>;
    userMistakes: string[];
    setUserMistakes: React.Dispatch<React.SetStateAction<string[]>>;
    lessonHistory: string[];
    setLessonHistory: React.Dispatch<React.SetStateAction<string[]>>;
    numericLevelId: number;
    //onUpdateMetrics: (metrics: TutorMetrics) => void;
}

// 1. Move the instance variable outside the component scope
let globalVadInstance: any = null;

const AgenticVoicePipeline = ({
    isTutorActive,
    isRecordingActive,
    setIsTutorActive,
    setIsRecordingActive,
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
    } = useTutor(numericLevelId/*, onUpdateMetrics*/, isTutorActive, setIsTutorActive, isRecordingActive, setIsRecordingActive, lessonHistory, setLessonHistory);

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


    const currentLevelContent: LevelContent = {
        level: numericLevelId,
        content: [],
        title: "",
        description: ""
    };

    // THE BRUTAL RESET CIRCUIT BREAKER
    useEffect(() => {
        if (!isTutorActive) {
            stopAudio(true);
            isProcessingRef.current = false;
            isExitingRef.current = false; // <--- CRITICAL: Reset this immediately
            initializationLockRef.current = null;

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

    const triggerTutorFlow = useCallback(async (count?: number, manualHistory?: string[]) => {

        // 1. Check if processing or missing content
        if (isProcessingRef.current || !currentLevelContent) return;
        isProcessingRef.current = true;

        // Usamos el 'count' que llega por argumento, 
        // pero si es undefined, leemos del ref para mantener la estabilidad.
        const activeCount = count ?? tutorSpeechCountRef.current;

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
            // Get active Supabase token
            //const { data: { session } } = await supabase.auth.getSession();
            //const token = session?.access_token;

            if (!tokenRef.current) {
                console.error("No hay token disponible, abortando fetch.");
                return;
            }


            const response = await fetch(`${API_BASE}/api/tutor/get-dynamic-question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenRef.current}` // Ahora sí llegará
                },
                body: JSON.stringify(payload)
            });


            const data = await response.json();

            // FIX: If the backend still sends "Excellent work", we ignore it and use a fallback 
            // to ensure Amy actually asks a question first.
            let questionText = data.question;
            if (questionText.includes("Excellent work") && payload.specificInstruction) {
                questionText = payload.specificInstruction;
            }

            const reconstructedQuestion = getGreetIntro() + questionText;

            currentQuestionRef.current = reconstructedQuestion;

            // CRITICAL: Always set 'shouldListen' to TRUE here so the mic opens
            await handleGenerateSpeech(reconstructedQuestion, true);
        } catch (error) {
            console.error("Backend Error:", error);
        } finally {
            isProcessingRef.current = false;
        }
    }, []);
    //"Reconstruye esta función cada vez que uno de estos valores cambie".


    // 1. UPDATED INITIALIZATION EFFECT
    useEffect(() => {
        // 1. Guardias: Token, motor listo, y condiciones de tutor
        if (!tokenRef.current || !isVadReady.current) return;

        const currentKey = `${numericLevelId}-${tutorSpeechCount}`;

        // If user pressed the tutor speaker button,
        // and tutor isn't trying to load something (initializationLockRef.current i empty)
        // if we have the material of the class obviously (currentLevelContent)
        // the sistem isn't busy delivering and bringing data from the API (we aren't on the middle of another operation)
        if (isTutorActive && !initializationLockRef.current && currentLevelContent && !isProcessingRef.current) {

            // initializationLockRef.current = "1-0 (for example)"
            initializationLockRef.current = currentKey;
            console.log("🚀 Initializing Tutor:", currentKey);

            // Call the main function that starts the whole process of the speech and API fetch
            triggerTutorFlow(tutorSpeechCount);
        }

        // FIX: If the user turns the tutor OFF manually, clear the lock 
        // so they can press the speaker button again immediately.
        if (!isTutorActive) {
            initializationLockRef.current = null;
        }

    }, [isTutorActive, currentLevelContent, numericLevelId, tutorSpeechCount, token]); // Añadido 'token' como dependencia

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

    // EFFECT B: The "Power Switch" (Reacts immediately to state changes)
    useEffect(() => {
        const syncMic = async () => {
            if (!vadRef.current) return;

            // Check the latest state values
            if (isTutorActive && isRecordingActive && !isExitingRef.current) {
                console.log("🎤 Mic Starting...");
                try {
                    await vadRef.current.start();
                } catch (e) {
                    console.error("VAD Start Error:", e);
                }
            } else {
                console.log("🔇 Mic Pausing...");
                vadRef.current.pause();
            }
        };
        syncMic();
    }, [isRecordingActive, isTutorActive]); // Dependencies ensure this runs when recording toggles

    return null;
};

export default AgenticVoicePipeline;