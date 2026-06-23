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

    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(() => {
            setAuthReady(true);
        });
    }, []);

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
        isProcessingRef,
        isAudioPlayingRef
    } = useTutor(numericLevelId/*, onUpdateMetrics*/, isTutorActive, setIsTutorActive, isRecordingActive, setIsRecordingActive, lessonHistory, setLessonHistory);

    const token = useAuthToken(); // Obtiene el token de la cookie de NextAuth

    // --- 2. RESTORE SYNCINDEXREF ---
    // Since this isn't in the hook yet, we keep it local to fix the error
    const syncIndexRef = useRef(tutorSpeechCount);

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
    //useEffect(() => {
    // If the tutor is turned off, we stop audio regardless of processing state
    //if (!isTutorActive) {
    //stopAudio();
    //}
    //}, [isTutorActive, stopAudio]);

    useEffect(() => {
        syncIndexRef.current = tutorSpeechCount;
    }, [tutorSpeechCount]);

    // Add this to clear history AND locks when the level OR page index changes
    // Keep your existing history/lock cleaner but make it even more aggressive
    useEffect(() => {
        setLessonHistory([]);
        setUserMistakes([]);
        initializationLockRef.current = null;
        isExitingRef.current = false;
        isProcessingRef.current = false;
    }, [numericLevelId]); // Removed tutorSpeechCount from here to prevent loops, let the circuit breaker handle the rest

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

    // Solo inicializa el tutor si authReady es true
    if (!authReady) return <div>Cargando sesión...</div>;

    const triggerTutorFlow = useCallback(async (count: number, manualHistory?: string[]) => {

        // 1. AÑADE ESTO: Si no hay token, no intentes nada.
        if (!token) {
            console.warn("⏳ Esperando token de autenticación...");
            return;
        }

        // 1. Check if processing or missing content
        if (isProcessingRef.current || !currentLevelContent) return;
        isProcessingRef.current = true;

        // 2. Determine which history to use (passed-in or state)
        const activeHistory = manualHistory || lessonHistory;

        const studyMaterial = currentLevelContent.content || [];
        const currentBlock: any = studyMaterial[count] || studyMaterial[0];

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

            //if (!token) {
            //console.error("No hay token disponible, abortando fetch.");
            //return;
            //}


            const response = await fetch(`${API_BASE}/api/tutor/get-dynamic-question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ahora sí llegará
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
    }, [token, lessonHistory, numericLevelId, currentLevelContent, getGreetIntro, handleGenerateSpeech]);

    // 1. UPDATED INITIALIZATION EFFECT
    useEffect(() => {
        const currentKey = `${numericLevelId}-${tutorSpeechCount}`;

        // If tutor is active and lock is empty, START
        if (isTutorActive && !initializationLockRef.current && currentLevelContent && !isProcessingRef.current) {

            initializationLockRef.current = currentKey;
            console.log("🚀 Initializing Tutor:", currentKey);

            triggerTutorFlow(tutorSpeechCount);
        }

        // FIX: If the user turns the tutor OFF manually, clear the lock 
        // so they can press the speaker button again immediately.
        if (!isTutorActive) {
            initializationLockRef.current = null;
        }

    }, [isTutorActive, currentLevelContent, triggerTutorFlow, numericLevelId, tutorSpeechCount]);

    const vadCreatedRef = useRef(false); // <--- AÑADE ESTO

    // EFFECT A: Create the VAD instance once (and only once)
    useEffect(() => {

        // Si ya existe O ya intentamos crearlo, NO lo hagas otra vez
        if (vadRef.current || vadCreatedRef.current) return;

        vadCreatedRef.current = true; // Marcamos antes de arrancar

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
    }, []);

    // EFFECT B: The "Power Switch" (Reacts immediately to state changes)
    useEffect(() => {
        const syncMic = async () => {
            if (!vadRef.current) return;

            // SEMÁFORO: Si el audio está sonando, el micrófono NO puede arrancar
            if (isAudioPlayingRef.current) {
                console.log("⏸️ Audio sonando, micrófono bloqueado por seguridad.");
                vadRef.current.pause();
                return;
            }

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
    }, [isRecordingActive, isTutorActive, isAudioPlayingRef.current]); // Dependencies ensure this runs when recording toggles

    return null;
};

export default AgenticVoicePipeline;