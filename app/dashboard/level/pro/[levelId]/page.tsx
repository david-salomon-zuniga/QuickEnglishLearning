"use client";
import { useState, useEffect, useMemo, use } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase";
import { useLevelNavigation } from "@/app/hooks/useLevelNavigation";
import AgenticVoicePipeline from "@/app/components/ai/AgenticVoicePipeline";
import { updateProgress } from "@/app/lib/progress";


import {
    PracticeType,
    PLACEHOLDER_QUESTIONS,
    AUDIO_PRACTICE_DATA,
    VIDEO_PRACTICE_DATA
} from "@/app/constants/practice";
import { shuffleArray } from "@/app/lib/utils";

// Component Imports
import { ImageParagraphPractice } from "@/app/components/practice/ImageParagraphPractice";
import { ActionReactionPractice } from "@/app/components/practice/ActionReactionPractice";
import { ListenSpeakPractice } from "@/app/components/practice/ListenSpeakPractice";
import { ListeningComprehensionPractice } from "@/app/components/practice/ListeningComprehensionPractice";
import { VideoPractice } from "@/app/components/practice/VideoPractice";
import { TextPractice } from "@/app/components/practice/TextPractice";

export default function ProLevelPage({ params }: { params: Promise<{ levelId: string }> }) {
    // 1. Unwrap params immediately at the top
    const resolvedParams = use(params);
    const numericLevelId = Number(resolvedParams.levelId);

    // 2. Standard Hooks (Next-auth, navigation, etc.)
    // 3. State Management
    const [session, setSession] = useState<any>(null); // Nuevo estado de sesión
    const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
    const searchParams = useSearchParams();

    // Efecto para escuchar la sesión de Supabase
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setStatus(session ? "authenticated" : "unauthenticated");
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setStatus(session ? "authenticated" : "unauthenticated");
        });

        return () => subscription.unsubscribe();
    }, []);

    const router = useRouter();

    const userId = useMemo(() => session?.user?.id || "", [session]);

    // 3. State Management
    const [isTutorActive, setIsTutorActive] = useState(false);
    const [isRecordingActive, setIsRecordingActive] = useState(false);
    const [userMistakes, setUserMistakes] = useState<string[]>([]);
    const [lessonHistory, setLessonHistory] = useState<string[]>([]);
    const [fullDialogue, setFullDialogue] = useState("");
    const [currentScore, setCurrentScore] = useState<number | null>(null);
    const [lastMetrics, setLastMetrics] = useState({ score: 0, successes: 0, mistakes: 0 });
    // Añade este estado en ProLevelPage.tsx
    const [maxLevel, setMaxLevel] = useState<number | null>(null);
    // To this:
    const [shuffledOrder, setShuffledOrder] = useState<PracticeType[]>(() =>
        shuffleArray(Object.values(PracticeType))
    );
    const [currentLevelContent, setCurrentLevelContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const isVocabLevel = numericLevelId >= 4;

    // 1. Obtén el token correctamente
    const token = (session as any)?.access_token; // Nota: en Supabase suele ser access_token

    // Font scaling logic specifically for Levels 42 and 43
    const getFontSize = (text: string) => {
        if (numericLevelId === 42 || numericLevelId === 43) {
            if (text.length > 100) return "text-[9px] md:text-base font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center leading-tight";
            if (text.length > 60) return "text-[11px] md:text-lg font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center";
            return "text-xs md:text-xl font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center";
        }
        return text.length > 2
            ? "text-[11px] md:text-lg font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center"
            : "text-3xl md:text-[6rem] font-bold text-center";
    };

    // --- Resuming Logic from URL ---
    const initialStep = parseInt(searchParams.get("step") || "0", 10);
    const initialSubstep = parseInt(searchParams.get("substep") || "0", 10);

    useEffect(() => {
        async function fetchProLevel() {
            if (isNaN(numericLevelId)) return;

            setLoading(true);

            interface LevelContentRow {
                item_a: string;
                item_b: string;
                item_c: string;
                item_d: string | null;
                audio_url: string | null;
                order_index: number;
            }

            const { data, error } = await supabase
                .from('level_content')
                .select('item_a, item_b, item_c, item_d, audio_url, order_index')
                .eq('level_id', numericLevelId)
                .order('order_index', { ascending: true });


            if (error) {
                setLoading(false);
                return;
            }

            // SUPOSICIÓN: Si tu nivel máximo es 45, asegúrate de setearlo.
            // Si puedes obtenerlo de la DB, úsalo; si no, hardcodea el valor máximo conocido.
            setMaxLevel(45);


            if (data && data.length > 0) {
                const allItems = (data as LevelContentRow[]).map(item => ({
                    itemA: item.item_a,
                    itemB: item.item_b,
                    itemC: item.item_c,
                    itemD: item.item_d,
                    audioUrl: item.audio_url
                }));

                //const itemsPerStep = 10;

                const groupedContent = [
                    {
                        stepIndex: 0,
                        content: allItems
                    }
                ];

                /*for (let i = 0; i < allItems.length; i += itemsPerStep) {
                    groupedContent.push({
                        stepIndex: i / itemsPerStep,
                        content: allItems.slice(i, i + itemsPerStep)
                    });
                }*/

                setCurrentLevelContent(groupedContent);
                setLoading(false);
            } else {
                console.warn("⚠️ AVISO: Supabase devolvió datos vacíos o el filtro .eq('level_id', numericLevelId) no encontró nada para el nivel:", numericLevelId);
                setLoading(false);
            }
        }
        fetchProLevel();
    }, [numericLevelId, session, status]);

    const {
        step,
        subStep,
        goNext,
        goBack,
        setStep,
        setSubStep,
        showPractice,
        practiceText,
        setPracticeText
    } = useLevelNavigation({
        numericLevelId,
        currentLevelContent,
        isVocabLevel,
        userId: userId,
        token: (session as any)?.access_token, // Asegúrate de usar access_token en lugar de accessToken si es la respuesta de Supabase
        initialStep,
        initialSubstep
    });

    // --- Progress Calculations ---
    const absoluteTotalItems = useMemo(() => {
        return currentLevelContent.reduce((acc, curr) => acc + (curr.content?.length || 0), 0);
    }, [currentLevelContent]);

    const itemsInPreviousSteps = useMemo(() => {
        return currentLevelContent
            .slice(0, step)
            .reduce((acc, curr) => acc + (curr.content?.length || 0), 0);
    }, [currentLevelContent, step]);

    const globalCompletedItems = itemsInPreviousSteps + subStep + 1;

    const progressPercentage = absoluteTotalItems > 0
        ? (globalCompletedItems / absoluteTotalItems) * 100
        : 0;

    // Asegúrate de que currentLevelContent tenga datos
    const currentItem = currentLevelContent.length > 0 && currentLevelContent[step]
        ? currentLevelContent[step].content[subStep]
        : null;
    const currentStepTotal = currentLevelContent[step]?.content?.length || 0;
    const isLastItemInLevel = step === currentLevelContent.length - 1 && (subStep + 1) === currentStepTotal;

    const isPracticeTime =
        isVocabLevel &&
        currentItem?.itemA &&
        (showPractice || globalCompletedItems % 10 === 0) &&
        !isLastItemInLevel; // Check if this is accidentally true at step 1, substep 9

    const randomAudio = useMemo(() => {
        const shuffled = shuffleArray([...AUDIO_PRACTICE_DATA]);
        return shuffled[0];
    }, [isPracticeTime]);

    const randomVideo = useMemo(() => {
        const shuffled = shuffleArray([...VIDEO_PRACTICE_DATA]);
        return shuffled[0];
    }, [isPracticeTime]);

    useEffect(() => {
        setShuffledOrder(shuffleArray(Object.values(PracticeType)));
    }, [numericLevelId]);

    const practiceCycleIndex = Math.floor(globalCompletedItems / 10) % (shuffledOrder.length || 1);
    const currentPracticeType = shuffledOrder[practiceCycleIndex] || PracticeType.IMAGE_PARAGRAPH;

    const practiceImage = `https://picsum.photos/seed/${numericLevelId}-${globalCompletedItems}/800/600`;
    const actionImage = `https://picsum.photos/seed/action-${numericLevelId}-${globalCompletedItems}/800/600`;

    const [tutorSpeechCount, setTutorSpeechCount] = useState(subStep);
    const MAX_SPEECHES = 4;

    const speak = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        const formattedHistory = lessonHistory.map((line, index) => {
            const isTutor = index % 2 === 0;
            const speaker = isTutor ? "Amy (Tutor)" : "You";
            let text = `${speaker}: ${line}`;
            if (!isTutor) {
                const analysisIndex = Math.floor(index / 2);
                const analysis = userMistakes[analysisIndex];
                if (analysis) text += `\n\n✨ Amy's Feedback:\n${analysis}`;
            }
            return text;
        }).join("\n\n" + "—".repeat(20) + "\n\n");

        setFullDialogue(formattedHistory);
    }, [lessonHistory, userMistakes]);

    useEffect(() => {
        setTutorSpeechCount(subStep);
        setLessonHistory([]);
        setUserMistakes([]);
    }, [subStep, numericLevelId]);

    const jumpToLetter = (letter: string) => {
        for (let stepIdx = 0; stepIdx < currentLevelContent.length; stepIdx++) {
            const items = currentLevelContent[stepIdx].content;

            const foundSubIndex = items.findIndex((item: any) =>
                item?.itemA?.trim().toUpperCase().startsWith(letter)
            );

            if (foundSubIndex !== -1) {
                setStep(stepIdx);
                setSubStep(foundSubIndex);

                // Sync the URL so the navigation stays consistent
                const params = new URLSearchParams(window.location.search);
                params.set('step', stepIdx.toString());
                params.set('substep', foundSubIndex.toString());
                router.replace(`${window.location.pathname}?${params.toString()}`);
                return; // Stop searching once found
            }
        }
    };

    const playAudioFile = (path: string) => {
        const audio = new Audio(path);
        audio.play().catch(e => console.error("Error playing audio:", e));
    };

    const handleRestart = async () => {
        setLoading(true);

        const sessionAny = session as any;
        const token = sessionAny?.access_token; // <--- Cambiado de accessToken a access_token

        // Pasamos el token si existe, si no, la función interna lo resolverá con Supabase
        await updateProgress(userId, 1, 0, 0, token);

        const isProPath = window.location.pathname.includes("/pro/");
        const baseRoute = isProPath ? "/dashboard/level/pro" : "/dashboard/level";

        router.refresh();
        router.push(`${baseRoute}/1?step=0&substep=0`);
    };

    if (!session || loading) return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">Syncing Pro Experience...</div>;

    if (status === "loading" || loading) return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">Syncing Pro Experience...</div>;
    if (status === "unauthenticated") return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">No autorizado</div>;

    if (numericLevelId !== null && maxLevel !== null && numericLevelId > maxLevel) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-4 md:p-8">
                <div className="w-full flex-1 md:h-[calc(100vh-100px)] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[40px] shadow-2xl relative p-6 md:p-12 flex flex-col items-center justify-center text-center text-white overflow-hidden">
                    <div className="mb-8 animate-bounce">
                        <span className="text-8xl">🏆</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">MISSION ACCOMPLISHED!</h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mb-12 opacity-90">
                        You've successfully completed all available levels. Your journey through the curriculum is complete for now!
                    </p>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleRestart}
                            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                        >
                            Restart Journey
                        </button>
                        <Link
                            href="/dashboard"
                            className="bg-blue-700/50 text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700/70 transition-all shadow-lg"
                        >
                            Return to Dashboard
                        </Link>
                    </div>

                    <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                </div>
            </div>
        );
    }


    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-2 md:p-4 font-sans overflow-hidden">
            <AgenticVoicePipeline
                tutorSpeechCount={tutorSpeechCount}
                MAX_SPEECHES={MAX_SPEECHES}
                setTutorSpeechCount={setTutorSpeechCount}
                isTutorActive={isTutorActive}
                isRecordingActive={isRecordingActive}
                setIsTutorActive={setIsTutorActive}
                setIsRecordingActive={setIsRecordingActive}
                userMistakes={userMistakes}
                setUserMistakes={setUserMistakes}
                lessonHistory={lessonHistory}
                setLessonHistory={setLessonHistory}
                numericLevelId={numericLevelId}
            //onUpdateMetrics={handleMetricsUpdate}
            />

            {/* Main Card */}
            <div className="w-full min-h-[90vh] md:h-[92vh] bg-white rounded-[40px] shadow-xl border border-gray-100 relative p-4 md:p-10 flex flex-col items-center z-10 overflow-hidden">

                {/* Close Button */}
                <Link href="/dashboard" className="absolute top-6 right-8 text-gray-300 hover:text-red-500 transition-colors text-2xl">✕</Link>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 overflow-hidden rounded-t-[40px]">
                    <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }} />
                </div>

                {/* Content Area */}
                <div className="w-full flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto overflow-y-auto">
                    {isPracticeTime ? (
                        <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 overflow-hidden">
                            {/* 1. Image Paragraph Practice */}
                            {currentPracticeType === PracticeType.IMAGE_PARAGRAPH && (
                                <ImageParagraphPractice
                                    practiceImage={practiceImage}
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}
                                    speak={speak}
                                />
                            )}

                            {/* 2. Action Reaction Practice */}
                            {currentPracticeType === PracticeType.ACTION_REACTION && (
                                <ActionReactionPractice
                                    actionImage={actionImage}
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}

                                />
                            )}

                            {/* 3. Listen & Speak Practice */}
                            {currentPracticeType === PracticeType.LISTEN_SPEAK && (
                                <ListenSpeakPractice
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}
                                    speakQuestions={() => {
                                        const randomQuestion = PLACEHOLDER_QUESTIONS[Math.floor(Math.random() * PLACEHOLDER_QUESTIONS.length)];
                                        speak(randomQuestion);
                                    }}
                                />
                            )}

                            {/* 4. Listening Comprehension */}
                            {currentPracticeType === PracticeType.LISTENING_COMPREHENSION && (
                                <ListeningComprehensionPractice
                                    {...randomAudio} // This spreads id, type, audioUrl, and questions into the component
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}
                                />
                            )}

                            {/* 5. Video Practice */}
                            {currentPracticeType === PracticeType.VIDEO && (
                                <div className="w-full flex flex-col items-center gap-2 md:gap-4 h-full max-h-[70vh]">
                                    {/* Shrink Video: Using max-w-xl instead of full width to save vertical space */}
                                    <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto p-4">
                                        <VideoPractice
                                            {...randomVideo}
                                            practiceText={practiceText}
                                            setPracticeText={setPracticeText}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 6. Text/Reading Practice */}
                            {currentPracticeType === PracticeType.TEXT && (
                                <TextPractice
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}
                                />
                            )}
                        </div>
                    ) : (currentItem ? (
                        <div key={`content-${numericLevelId}-${step}-${subStep}`} className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 w-full space-y-4">

                            {/* Title/Header Text */}
                            <div className={`font-medium text-blue-500 w-full leading-tight ${currentItem?.itemC?.length > 20 ? "text-base md:text-xl" : "text-xl md:text-3xl"}`}>
                                {currentItem?.itemC}
                            </div>

                            {/* Main Interaction Area */}
                            <div className="flex flex-col items-center gap-4 w-full">
                                <div className={`text-gray-900 leading-tight select-none break-words w-full px-4 whitespace-pre-wrap ${getFontSize(currentItem.itemA)}`}>
                                    {currentItem.itemA}
                                </div>

                                <div className="flex flex-row items-center gap-4">
                                    {numericLevelId === 2 && subStep !== 0 && subStep !== 1 && subStep !== 2 && subStep !== 3 ? (
                                        <button
                                            onClick={() => playAudioFile(`/audio/track_${globalCompletedItems}.mp3`)}
                                            className="cursor-pointer p-3 md:p-5 rounded-full shadow-lg transition-all border border-gray-100 bg-white hover:shadow-2xl active:bg-blue-500 active:scale-95"
                                        >
                                            <span className="text-2xl">🔊</span>
                                        </button>
                                    ) : (
                                        <button
                                            disabled={isTutorActive}
                                            onClick={() => setIsTutorActive(true)}
                                            className={`cursor-pointer p-3 md:p-5 rounded-full shadow-lg transition-all border border-gray-100 ${isTutorActive ? "bg-amber-400 opacity-50 cursor-not-allowed" : "bg-white hover:shadow-2xl active:scale-95"}`}
                                        >
                                            <span className={`text-2xl ${isTutorActive ? "animate-pulse" : ""}`}>
                                                {isRecordingActive ? "🔴" : "🔊"}
                                            </span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            setIsTutorActive(false);
                                            setIsRecordingActive(false);
                                            setTutorSpeechCount(subStep);
                                            setLessonHistory([]);
                                            setUserMistakes([]);
                                        }}
                                        className="cursor-pointer p-3 md:p-5 rounded-full shadow-lg transition-all border border-gray-100 bg-white hover:shadow-2xl active:bg-amber-400 active:scale-95"
                                    >
                                        <span className="text-2xl">↻</span>
                                    </button>
                                </div>
                            </div>

                            {/* Alphabet Jumper */}
                            {isVocabLevel && numericLevelId < 8 && (
                                <div className="flex flex-wrap justify-center gap-1 px-4">
                                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => jumpToLetter(l)}
                                            className="text-blue-400 font-bold text-[10px] hover:text-blue-700 transition-all px-0.5"
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Transcript Area */}
                            <div className="w-full max-w-xl">
                                <label className="block text-center text-[9px] font-black text-blue-300 uppercase mb-1 tracking-widest">
                                    Conversation Transcript & AI Scoring
                                </label>
                                <textarea
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-mono text-[10px] leading-relaxed shadow-inner h-14 md:h-20 overflow-y-auto"
                                    value={fullDialogue}
                                    placeholder="You can use this text area as a diary to practice whatever you want..."
                                    onChange={(e) => setFullDialogue(e.target.value)} // Add this
                                    readOnly={false} // Change to false
                                />

                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-400 italic">Syncing level data...</div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="w-full flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <div
                        className={`flex items-center gap-2 group ${isTutorActive ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => !isTutorActive && goBack(isPracticeTime)}
                    >
                        <span className="text-gray-300 group-hover:text-gray-600 transition-colors text-xl">←</span>
                        <span className="text-gray-300 font-bold uppercase tracking-widest text-[10px] group-hover:text-gray-600 transition-colors">Back</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-200 font-mono text-xs hidden sm:block">
                            {globalCompletedItems} / {absoluteTotalItems}
                        </span>
                        <button
                            disabled={isTutorActive}
                            onClick={() => !isTutorActive && goNext(isPracticeTime)}
                            className={`flex items-center justify-center transition-all p-2 ${isTutorActive ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#374151" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}