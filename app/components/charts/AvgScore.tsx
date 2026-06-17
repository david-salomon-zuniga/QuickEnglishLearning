"use client";
import { LevelStat } from "@/app/types/tutor";


export default function AvgScore({ data }: { data: LevelStat[] }) {
    // Scale Configuration (Keep your existing logic)
    const maxScore = 100;
    const maxLevel = 50;

    const getX = (level: number) => (level / maxLevel) * 100;
    const getY = (score: number) => 100 - (score / maxScore) * 100;

    return (
        <div className="flex h-full w-full bg-slate-50 border-l-[6px] border-b-[6px] border-l-rose-300 border-b-cyan-300 relative">
            <div className="flex flex-col h-full w-full bg-slate-50">
                <div className="relative h-full w-full">

                    {/* DATA POINTS & PERMANENT LABELS */}
                    <svg className="absolute inset-0 h-full w-full overflow-visible z-10">
                        {data.map((d, i) => (
                            <g key={i}>
                                {/* The Green Circle */}
                                <circle
                                    cx={`${getX(d.level || 0)}%`}
                                    cy={`${getY(d.success || 0)}%`}
                                    r="4"
                                    fill="#22c55e"
                                    stroke="#065c0b"
                                    strokeWidth="2"
                                    className="drop-shadow-sm"
                                />

                                {/* THE PERMANENT CLOUD LABEL */}
                                <foreignObject
                                    x={`${getX(d.level || 0)}%`}
                                    y={`${getY(d.success || 0)}%`}
                                    width="100"
                                    height="50"
                                    style={{ transform: "translate(10px, -40px)" }} // Top-right offset
                                    className="overflow-visible"
                                >
                                    <div className="relative bg-white border border-slate-200 rounded-md shadow-sm p-1 flex flex-col text-[9px] leading-tight font-bold text-slate-700">
                                        <span className="text-blue-600">Level: {d.level}</span>
                                        <span>Successes: {d.success}</span>

                                        {/* Tiny Cloud Tail/Pointer */}
                                        <div className="absolute -bottom-[3px] left-0 w-1.5 h-1.5 bg-white border-b border-l border-slate-200 rotate-45"></div>
                                    </div>
                                </foreignObject>
                            </g>
                        ))}
                    </svg>

                    {/* Y-AXIS (Your original logic) */}
                    <svg className="relative h-full w-4 overflow-visible">
                        <line x1="0" y1="0" x2="0" y2="100%" stroke="#000000" strokeWidth="1" />
                        {[...Array(11)].map((_, i) => (
                            <g key={i}>
                                <line x1="80%" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#b900a6" strokeWidth="1" />
                                <text x="70%" y={`${i * 10}%`} textAnchor="end" alignmentBaseline="middle" fontSize="10" fill="#8d008a">
                                    {100 - (i * 10)}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* X-AXIS (Your original logic) */}
                    <svg className="relative z-9 w-full h-4 overflow-visible">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="#000000" strokeWidth="1" />
                        {[...Array(11)].map((_, i) => (
                            <g key={i} transform="translate(0, -4)">
                                <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="6" stroke="#3438c1" strokeWidth="1" />
                                <text x={`${i * 10}%`} y="20" textAnchor="middle" fontSize="10" fill="#1063a3">
                                    {i * 5}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}