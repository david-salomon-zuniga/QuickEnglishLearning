"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase";
import { shuffleArray } from "@/app/lib/utils";
import { useLevelNavigation } from "@/app/hooks/useLevelNavigation";
import { updateProgress } from "@/app/lib/progress";
import { API_BASE } from '@/lib/api';

import {
    PracticeType,
    PLACEHOLDER_QUESTIONS,
    AUDIO_PRACTICE_DATA,
    VIDEO_PRACTICE_DATA
} from "@/app/constants/practice";

import { ImageParagraphPractice } from "@/app/components/practice/ImageParagraphPractice";
import { ActionReactionPractice } from "@/app/components/practice/ActionReactionPractice";
import { ListenSpeakPractice } from "@/app/components/practice/ListenSpeakPractice";
import { ListeningComprehensionPractice } from "@/app/components/practice/ListeningComprehensionPractice";
import { VideoPractice } from "@/app/components/practice/VideoPractice";
import { TextPractice } from "@/app/components/practice/TextPractice";

export default function LevelPage() {
    const { data: session, status } = useSession();
    const userId = session?.user?.id || "";
    const paramsData = useParams();
    const router = useRouter();


    const numericLevelId = useMemo(() => {
        // Access levelId because the folder is named [levelId]
        const id = paramsData?.levelId ? Number(paramsData.levelId) : null;
        return id;
    }, [paramsData?.levelId]); // Update dependency to levelId

    const [currentLevelContent, setCurrentLevelContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [maxLevel, setMaxLevel] = useState<number | null>(null);

    const isVocabLevel = numericLevelId !== null && numericLevelId >= 4;

    const getFontSize = (text: string) => {
        if (numericLevelId === 42 || numericLevelId === 43) {
            if (text.length > 100) return "text-[9px] md:text-base font-normal bg-white/50 p-2 md:p-6 rounded-2xl border border-blue-100 text-center leading-tight";
            if (text.length > 60) return "text-[11px] md:text-lg font-normal bg-white/50 p-2 md:p-6 rounded-2xl border border-blue-100 text-center";
            return "text-xs md:text-xl font-normal bg-white/50 p-2 md:p-6 rounded-2xl border border-blue-100 text-center";
        }
        return text.length > 2
            ? "text-[11px] md:text-lg font-normal bg-white/50 p-2 md:p-6 rounded-2xl border border-blue-100 text-center"
            : "text-3xl md:text-[6rem] font-bold text-center";
    };


    useEffect(() => {
        if (numericLevelId === null || isNaN(numericLevelId) || !session) return;

        async function fetchLevelData() {
            try {
                setLoading(true);

                // 1. Extraemos el token inyectado en NextAuth
                const token = (session as any)?.accessToken;



                // 2. Solicitamos los datos a Go con el protocolo Authorization Bearer
                const res = await fetch(`${API_BASE}/api/level-content?levelId=${numericLevelId}`, {
                    cache: 'no-store',
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    }
                });

                if (!res.ok) {
                    throw new Error(`Go Backend error: ${res.status}`);
                }

                const data = await res.json(); // Trae { max_level: X, content: [...] }

                // 3. Guardamos el nivel máximo que calculó Go
                if (data.max_level) {
                    setMaxLevel(data.max_level);
                }

                // 4. Mapeamos el contenido al formato exacto que usa tu UI
                if (data.content && data.content.length > 0) {
                    const formattedContent = data.content.map((part: any) => ({
                        // Go ahora envía "level" en minúsculas debido al nuevo struct MissionPart
                        level: part.level || numericLevelId,

                        // Go envía "content" que contiene la lista de ítems de la base de datos
                        content: (part.content || []).map((item: any) => ({
                            itemA: item.item_a,
                            itemB: item.item_b,
                            itemC: item.item_c,
                            itemD: item.item_d,
                            audioUrl: item.audio_url
                        }))
                    }));

                    setCurrentLevelContent(formattedContent);
                } else {
                    setCurrentLevelContent([]);
                }

            } catch (err) {
                console.error("❌ Error fetching level data via Go endpoint:", err);
                setCurrentLevelContent([]);
            } finally {
                setLoading(false);
            }
        }

        if (status === "authenticated") {
            fetchLevelData();
        }
    }, [numericLevelId, session, status]);

    const navigationProps = useLevelNavigation({
        numericLevelId: numericLevelId || 0,
        currentLevelContent,
        isVocabLevel,
        userId: userId,
        token: (session as any)?.accessToken // 🔥 Enlace directo del token vivo de la sesión
    });

    const {
        step,
        subStep,
        showPractice,
        practiceText,
        setPracticeText,
        goNext,
        goBack,
        setStep,
        setSubStep
    } = navigationProps;



    const totalItems = currentLevelContent.reduce((acc, curr) => acc + (curr.content as any[]).length, 0);
    const currentPage = currentLevelContent[step];
    const currentItem = (currentPage?.content as any)?.[subStep];
    const itemsInPreviousParts = currentLevelContent.slice(0, step).reduce((acc, curr) => acc + (curr.content as any[]).length, 0);
    const completedItems = itemsInPreviousParts + subStep + 1;
    const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const isLastItem = completedItems === totalItems;

    const isPracticeTime = isVocabLevel && currentItem?.itemA && (showPractice || completedItems % 10 === 0) && !isLastItem;

    const randomAudio = useMemo(() => {
        const shuffled = shuffleArray([...AUDIO_PRACTICE_DATA]);
        return shuffled[0];
    }, [isPracticeTime]);

    const randomVideo = useMemo(() => {
        const shuffled = shuffleArray([...VIDEO_PRACTICE_DATA]);
        return shuffled[0];
    }, [isPracticeTime]);

    const [shuffledOrder, setShuffledOrder] = useState<PracticeType[]>([]);

    useEffect(() => {
        setShuffledOrder(shuffleArray(Object.values(PracticeType)));
    }, [numericLevelId]);

    const practiceCycleIndex = Math.floor(completedItems % (shuffledOrder.length || 1));
    const currentPracticeType = shuffledOrder[practiceCycleIndex] || shuffledOrder[0];

    const practiceImage = `https://picsum.photos/seed/${numericLevelId}-${completedItems}/800/600`;
    const actionImage = `https://picsum.photos/seed/action-${numericLevelId}-${completedItems}/800/600`;

    const speak = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    const playAudioFile = (path: string) => {
        const audio = new Audio(path);
        audio.play().catch(e => console.error("Error playing audio:", e));
    };

    const handleRestart = async () => {
        setLoading(true);

        // Extrae el token igual que lo haces en fetchLevelData
        const token = (session as any)?.accessToken;

        // 🔥 Pásalo como quinto argumento aquí:
        await updateProgress(userId, 1, 0, 0, token);

        const isProPath = window.location.pathname.includes("/pro/");
        const baseRoute = isProPath ? "/dashboard/level/pro" : "/dashboard/level";
        router.push(`${baseRoute}/1?step=0&substep=0`);
    };

    const jumpToLetter = (letter: string) => {
        for (let i = 0; i < currentLevelContent.length; i++) {
            const contentArray = currentLevelContent[i].content as any[];
            const foundSubIndex = contentArray.findIndex(item =>
                item.itemA.trim().toUpperCase().startsWith(letter)
            );
            if (foundSubIndex !== -1) {
                setStep(i);
                setSubStep(foundSubIndex);
                break;
            }
        }
    };

    // LOGGING RENDER CONDITIONS


    if (loading || !session) return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">Loading Content...</div>;

    // 🔥 Ahora sí: Solo si el nivel actual superó el máximo nivel real del juego
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
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-4 md:p-8">
            <div className="w-full flex-1 md:h-[calc(100vh-100px)] bg-[#e0f2fe] rounded-[40px] shadow-sm border border-blue-200/50 relative p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden z-10">

                <div className="absolute top-10 left-12 hidden md:block">
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Level {numericLevelId}</span>
                    <h2 className="text-2xl font-bold text-gray-800">{isPracticeTime ? "Checkpoint" : `Mission Part ${step + 1}`}</h2>
                </div>
                <Link href="/dashboard" className="absolute top-10 right-12 text-gray-400 hover:text-red-500 transition-colors">✕</Link>

                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100/50">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out rounded-r-full" style={{ width: `${progressPercentage}%` }} />
                </div>

                <div className="w-full flex-1 flex flex-col items-center justify-center px-2 overflow-hidden">
                    {isPracticeTime ? (
                        <>
                            {currentPracticeType === PracticeType.IMAGE_PARAGRAPH && (
                                <ImageParagraphPractice practiceImage={practiceImage} practiceText={practiceText} setPracticeText={setPracticeText} speak={speak} />
                            )}
                            {currentPracticeType === PracticeType.ACTION_REACTION && (
                                <ActionReactionPractice actionImage={actionImage} practiceText={practiceText} setPracticeText={setPracticeText} />
                            )}
                            {currentPracticeType === PracticeType.LISTEN_SPEAK && (
                                <ListenSpeakPractice practiceText={practiceText} setPracticeText={setPracticeText} speakQuestions={() => {
                                    const randomQuestion = PLACEHOLDER_QUESTIONS[Math.floor(Math.random() * PLACEHOLDER_QUESTIONS.length)];
                                    speak(randomQuestion);
                                }} />
                            )}
                            {currentPracticeType === PracticeType.LISTENING_COMPREHENSION && (
                                <ListeningComprehensionPractice
                                    id={randomAudio.id}
                                    type={randomAudio.type}
                                    audioUrl={randomAudio.audioUrl}
                                    // @ts-ignore
                                    questions={randomAudio.questions}
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}
                                />
                            )}
                            {currentPracticeType === PracticeType.VIDEO && (
                                <VideoPractice
                                    id={randomVideo.id}
                                    type={randomVideo.type}
                                    videoUrl={randomVideo.videoUrl}
                                    title={randomVideo.title}
                                    questions={randomVideo.questions}
                                    practiceText={practiceText}
                                    setPracticeText={setPracticeText}
                                />
                            )}
                            {currentPracticeType === PracticeType.TEXT && (
                                <TextPractice practiceText={practiceText} setPracticeText={setPracticeText} />
                            )}
                        </>
                    ) : (
                        currentItem && (
                            <div key={`${step}-${subStep}`} className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                                <div className={`font-medium text-blue-600 mb-1 md:mb-4 w-full ${currentItem.itemC.length > 20 ? "text-lg md:text-3xl" : "text-3xl md:text-6xl"}`}>{currentItem.itemC}</div>
                                <div className="flex flex-col items-center gap-2 md:gap-6 w-full">
                                    <div className={`text-slate-900 leading-tight select-none break-words w-full px-3 whitespace-pre-wrap ${getFontSize(currentItem.itemA)}`}>{currentItem.itemA}</div>
                                    {numericLevelId === 2 && subStep !== 0 && subStep !== 1 && subStep !== 2 && subStep !== 3 ? (
                                        <button onClick={() => playAudioFile(`/audio/track_${subStep + 1}.mp3`)} className="p-2 md:p-5 bg-blue-500 text-white rounded-full shadow-md active:scale-95">🔊</button>
                                    ) : (
                                        <button onClick={() => speak(currentItem.itemB)} className="p-2 md:p-5 bg-blue-500 text-white rounded-full shadow-md active:scale-95">🔊</button>
                                    )}
                                </div>
                                {(numericLevelId !== null && numericLevelId >= 4 && numericLevelId < 8) && (
                                    <div className="mt-4 flex flex-wrap justify-center gap-2 px-4 max-w-lg">
                                        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                                            <button key={l} onClick={() => jumpToLetter(l)} className="text-blue-500 font-bold text-sm md:text-base px-1 hover:text-blue-800 transition-colors">{l}</button>
                                        ))}
                                    </div>
                                )}
                                <p className="mt-2 md:mt-6 text-sm md:text-xl text-blue-400 font-light italic">"{currentItem.itemB}"</p>
                            </div>
                        )
                    )}
                </div>

                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 flex items-center gap-2 group cursor-pointer" onClick={() => goBack(isPracticeTime)}>
                    <button className="text-gray-400 group-hover:text-black transition-colors">←</button>
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs group-hover:text-black transition-colors">Previous</span>
                </div>

                <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 flex items-center gap-6">
                    <span className="text-gray-400 font-mono text-sm hidden sm:block">{completedItems} / {totalItems}</span>
                    <button onClick={() => goNext(isPracticeTime)} className="flex items-center justify-center hover:scale-110 transition-transform p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#000000" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}