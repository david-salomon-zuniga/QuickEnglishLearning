"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase";
import { saveEvaluation } from "@/app/lib/progress";

function PracticeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // --- State ---
    const [userId, setUserId] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [successCount, setSuccessCount] = useState(0);
    const [failureCount, setFailureCount] = useState(0);
    const [currentLevel, setCurrentLevel] = useState<any>(null);
    const [allLevels, setAllLevels] = useState<number[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize level numbers 1 to 50
    useEffect(() => {
        const levels = Array.from({ length: 45 }, (_, i) => i + 1);
        setAllLevels(levels);
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollContainerRef.current && currentLevel) {
            const activeElement = scrollContainerRef.current.querySelector(`[data-level="${currentLevel.level}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [currentLevel]);

    // --- Data Fetching Guarded by Session ---
    useEffect(() => {
        async function loadPractice() {
            setLoading(true);
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setShowFeedback(false);

            // 1. Obtener sesión de Supabase
            const { data: { session } } = await supabase.auth.getSession();

            // 2. Validación de usuario
            if (!session?.user?.id) {
                console.error("❌ [PRACTICE] Usuario no autenticado. Redirigiendo...");
                router.push("/dashboard");
                return;
            }

            setUserId(session.user.id);
            const rawParam = searchParams.get("level");
            const urlLevel = rawParam && !isNaN(Number(rawParam)) ? Number(rawParam) : 1;

            const { data: practiceInfo, error: practiceError } = await supabase
                .from('practice')
                .select('*')
                .eq('level_number', urlLevel)
                .maybeSingle();

            if (practiceError) {
                console.error("❌ [PRACTICE] Error en tabla 'practice':", practiceError.message);
            }

            if (practiceInfo) {
                const { data: questionData, error: questionsError } = await supabase
                    .from('practice_questions')
                    .select('*')
                    .eq('practice_id', practiceInfo.id);

                if (questionsError) {
                    console.error("❌ [PRACTICE] Error en 'practice_questions':", questionsError.message);
                }

                if (questionData && questionData.length > 0) {
                    const shuffled = [...questionData].sort(() => Math.random() - 0.5);
                    const selectedQuestions = shuffled.slice(0, 10);

                    const formattedQuestions = selectedQuestions.map(q => ({
                        id: q.id,
                        question: q.question_text,
                        answer: q.correct_answer,
                        options: {
                            A: q.option_a,
                            B: q.option_b,
                            C: q.option_c,
                            D: q.option_d
                        }
                    }));

                    setCurrentLevel({
                        id: practiceInfo.id,
                        level: practiceInfo.level_number,
                        topic: practiceInfo.topic,
                        explanation: practiceInfo.explanation
                    });

                    setQuestions(formattedQuestions);
                    setLoading(false);
                    return;
                }
            }

            console.error("⚠️ [PRACTICE] No se pudieron leer las filas de la DB. Revisa las políticas RLS.");

            setCurrentLevel({
                id: "fallback-id",
                level: urlLevel,
                topic: "Practice Session (Fallback Mode)",
                explanation: "Las políticas RLS bloquearon la lectura directa desde el cliente. Revisa la consola."
            });
            setQuestions([
                {
                    id: "f1",
                    question: "RLS is blocking the client. Choose 'A' to continue testing UI functionality.",
                    answer: "A",
                    options: { A: "Fix RLS configuration", B: "Ignore", C: "Bypass", D: "None" }
                }
            ]);
            setLoading(false);
        }

        loadPractice();
    }, [searchParams, router]); // Dependencias limpias

    const currentQuestion = questions[currentQuestionIndex] || null;

    const handleOptionSelect = (key: string) => {
        if (showFeedback || !currentQuestion) return;
        setSelectedOption(key);
        setShowFeedback(true);

        if (key === currentQuestion.answer) {
            setSuccessCount((s) => s + 1);
        } else {
            setFailureCount((f) => f + 1);
        }
    };

    const handleNext = async () => {
        if (!userId) {
            console.error("No User ID found");
            return;
        }

        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        if (isLastQuestion) {
            const numericLevelId = Number(currentLevel.level);

            const { data: existingData } = await supabase
                .from('practice_history')
                .select('successes, mistakes, score')
                .eq('user_id', userId)
                .eq('level_id', numericLevelId)
                .maybeSingle();

            const prevSuccesses = Number(existingData?.successes || 0);
            const prevMistakes = Number(existingData?.mistakes || 0);

            const totalSuccesses = prevSuccesses + successCount;
            const totalMistakes = prevMistakes + failureCount;

            const grandTotal = totalSuccesses + totalMistakes;
            const cumulativeScore = grandTotal > 0
                ? Math.round((totalSuccesses / grandTotal) * 100)
                : 0;

            const payload = {
                level_id: numericLevelId,
                step: 0,
                substep: 0,
                score: cumulativeScore,
                successes: totalSuccesses,
                with_mistakes: totalMistakes,
                mistakes: totalMistakes
            };

            try {
                // Supabase maneja el token automáticamente en el cliente configurado
                await saveEvaluation(userId, payload);
            } catch (err) {
                console.error("Error saving evaluation:", err);
            }

            const nextLevelNum = numericLevelId + 1;
            const { data: nextLevelExists } = await supabase
                .from('practice')
                .select('level_number')
                .eq('level_number', nextLevelNum)
                .maybeSingle();

            if (nextLevelExists) {
                router.push(`/dashboard/practice?level=${nextLevelNum}`);
            } else {
                router.push("/dashboard");
            }
            return;
        }

        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        window.scrollTo(0, 0);
    };

    if (loading || !currentLevel || !currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD] p-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
                    <p className="text-xl font-bold text-slate-700 animate-pulse">Loading Session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#E3F2FD] flex flex-col items-center p-0 sm:p-2 md:p-4">
            <div className="w-full max-w-4xl bg-white sm:rounded-[30px] shadow-2xl flex flex-col h-full overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 md:px-10 flex justify-between items-start">
                    <div>
                        <p className="text-blue-600 font-black text-[9px] uppercase tracking-widest">
                            Level {currentLevel.level}
                        </p>
                        <h1 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight">
                            {currentLevel.topic}
                        </h1>
                    </div>
                    <Link href="/dashboard" className="text-slate-300 hover:text-red-500 text-lg transition-colors p-1">✕</Link>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow flex flex-col items-center justify-center w-full px-6 md:px-12 overflow-y-auto custom-scrollbar">

                    {/* Horizontal Level Navigation */}
                    <div className="w-full max-w-2xl mb-3 border-b border-slate-50 pb-2">
                        <div
                            ref={scrollContainerRef}
                            className="flex flex-row overflow-x-auto py-1 gap-2 px-2 scroll-smooth"
                        >
                            {allLevels.map((lvl) => (
                                <Link
                                    key={lvl}
                                    data-level={lvl}
                                    href={`/dashboard/practice?level=${lvl}`}
                                    className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all shadow-sm ${currentLevel.level === lvl
                                        ? "bg-blue-600 text-white scale-105 shadow-md ring-2 ring-blue-100"
                                        : "bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500"
                                        }`}
                                >
                                    {lvl}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-xl italic text-blue-800 text-[11px] md:text-xs max-w-2xl w-full border border-blue-100">
                        {currentLevel.explanation}
                    </div>

                    {/* Question */}
                    <h2 className="text-base md:text-xl font-semibold text-slate-700 mb-4 md:mb-6 leading-snug">
                        {currentQuestion.question}
                    </h2>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full max-w-2xl mb-4">
                        {Object.entries(currentQuestion.options || {}).map(([key, value]) => {
                            if (!value) return null;
                            const isCorrect = key === currentQuestion.answer;
                            const isSelected = key === selectedOption;

                            let style = "border-slate-100 text-slate-600 hover:bg-slate-50";
                            if (showFeedback) {
                                if (isCorrect) style = "bg-green-500 border-green-500 text-white shadow-sm scale-[1.01]";
                                else if (isSelected) style = "bg-red-500 border-red-500 text-white";
                                else style = "opacity-30 border-transparent";
                            }

                            return (
                                <button
                                    key={key}
                                    disabled={showFeedback}
                                    onClick={() => handleOptionSelect(key)}
                                    className={`p-3 md:p-4 rounded-xl border-2 font-bold transition-all duration-200 text-left flex items-center text-xs md:text-sm ${style}`}
                                >
                                    <span className={`mr-3 shrink-0 ${showFeedback && isCorrect ? 'text-white' : 'text-blue-400'}`}>{key}.</span>
                                    <span className="flex-1">{value as string}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:px-8 bg-slate-50 border-t flex flex-row justify-between items-center sticky bottom-0 w-full">
                    <div className="flex gap-4 md:gap-8">
                        <div className="text-center">
                            <p className="text-[8px] font-black text-slate-400 uppercase">Correct</p>
                            <p className="text-sm md:text-lg font-bold text-green-600">{successCount}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[8px] font-black text-slate-400 uppercase">Wrong</p>
                            <p className="text-sm md:text-lg font-bold text-red-600">{failureCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 font-mono text-[9px] md:text-xs">
                            {currentQuestionIndex + 1} / {questions.length}
                        </span>
                        {showFeedback ? (
                            <button
                                onClick={handleNext}
                                className="bg-black text-white px-5 md:px-8 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm shadow-md active:scale-95 transition-transform"
                            >
                                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next →"}
                            </button>
                        ) : (
                            <div className="w-[80px] md:w-[100px]" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PracticePage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <PracticeContent />
        </Suspense>
    );
}