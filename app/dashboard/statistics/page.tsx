"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { supabase } from "@/app/utils/supabase";
import AvgScore from "../../components/charts/AvgScore";
import { LevelStat } from "@/app/types/statistics";
import ProgressMastery from "@/app/components/charts/ProgressMastery";
import MistakeTracker from "../../components/charts/MistakeTracker";
import { API_BASE } from '@/lib/api';

interface StatsData {
    globalAverage: number;
    progressReached: number;
    totalMistakes: number;
    levelRanking: LevelStat[];
}

export default function StatisticsPage() {


    const [currentCard, setCurrentCard] = useState(0);
    const [stats, setStats] = useState<StatsData | null>(null);
    const [levelHistory, setLevelHistory] = useState<LevelStat[]>([]);

    useEffect(() => {
        async function loadStats() {
            // Obtener sesión de Supabase
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user?.id) {
                const userId = session.user.id;
                // Nota: Asumiendo que el backend espera el token de Supabase en el header
                const token = session.access_token;

                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                // Fetch Evaluation Stats
                fetch(`${API_BASE}/api/get-evaluation-stats?userId=${userId}`, { headers })
                    .then(res => res.json())
                    .then(data => setStats(data))
                    .catch(err => console.error("Error fetching stats:", err));

                // Fetch Level History
                fetch(`${API_BASE}/api/get-level-history?userId=${userId}`, { headers })
                    .then(res => res.json())
                    .then(data => setLevelHistory(data || []))
                    .catch(err => console.error("Error fetching level history:", err));
            }
        }

        loadStats();
    }, []);
    const cards = [
        { title: "Global Knowledge", subtitle: "Average Score & Complexity" },
        { title: "Progress Mastery", subtitle: "Time (2 years aprox.) vs Levels Reached" },
        { title: "Mistake Tracker", subtitle: "Total Errors per Level" }
    ];

    const nextCard = () => setCurrentCard((prev) => (prev + 1) % cards.length);
    const prevCard = () => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);

    const renderGraphic = () => {
        if (!stats?.levelRanking) {
            return (
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="animate-pulse text-slate-400 mb-1 font-medium text-sm">Loading analytics...</div>
                    <p className="text-[10px] text-slate-400 font-light">Analyzing your progress.</p>
                </div>
            );
        }

        const rankingData = stats.levelRanking;

        switch (currentCard) {
            case 0: return <AvgScore data={rankingData} />;
            case 1: return <ProgressMastery data={levelHistory} />;
            case 2: return <MistakeTracker data={rankingData} />;
            default: return null;
        }
    };

    return (
        <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
            <div className="w-16 flex-shrink-0 z-20">
                <Sidebar />
            </div>

            <main className="flex-1 flex flex-col items-center p-4 md:p-6 overflow-hidden">
                <div className="w-full max-w-4xl flex flex-col h-full">
                    <header className="flex justify-between items-end mb-4 px-2">
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-none">Learning Analytics</h1>
                            <p className="text-slate-500 text-xs mt-1 italic">Performance metrics & trends</p>
                        </div>

                        {(() => {
                            const scoreValue = stats?.globalAverage ?? 0;
                            return (
                                <div className="text-right">
                                    <div className="text-[10px] uppercase text-slate-400 font-bold">Global Score</div>
                                    <div className="text-xl font-mono font-bold text-blue-600 leading-none">
                                        {scoreValue > 0 ? scoreValue.toFixed(1) : "0"}
                                    </div>
                                </div>
                            );
                        })()}
                    </header>

                    <div className="bg-white p-5 md:p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col max-h-[75vh] flex-1 overflow-hidden">
                        <div className="flex flex-col flex-1 min-h-0">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[9px] font-bold uppercase tracking-widest inline-block self-start mb-2">
                                Insight {currentCard + 1} of 3
                            </span>

                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">{cards[currentCard].title}</h2>
                            <p className="text-slate-400 text-sm md:text-base font-light italic mb-4">{cards[currentCard].subtitle}</p>

                            <div className="flex-1 min-h-0 py-2">
                                {renderGraphic()}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-2">
                            <div className="flex gap-1.5">
                                {cards.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentCard ? "bg-blue-600 w-5" : "bg-slate-200 w-1.5"}`} />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={prevCard} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-sm">←</button>
                                <button onClick={nextCard} className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform text-sm shadow-md">→</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}