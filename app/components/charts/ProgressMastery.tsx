"use client";

export default function ProgressMastery({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    // Use the earliest record to define "Day 0"
    const firstActivityDate = new Date(data[0].created_at || data[0].updated_at).getTime();

    const processedData = data.map((ls) => {
        const currentEntryTime = new Date(ls.created_at || ls.updated_at).getTime();
        const diffMs = currentEntryTime - firstActivityDate;
        // Days passed since start
        const daysSinceStart = diffMs / (1000 * 60 * 60 * 24);

        return {
            ...ls,
            daysSinceStart,
            startDate: new Date(ls.created_at || ls.updated_at).toLocaleDateString(undefined, {
                month: 'short', day: 'numeric', year: 'numeric'
            })
        };
    });

    // X-AXIS: 0 to 50 scale
    const maxLevel = 50;
    const getX = (level: number) => (level / maxLevel) * 100;

    // Y-AXIS: 0 to 2.0 scale
    const getYTime = (days: number) => {
        // Based on your 12 months / 5 logic: 2.0 on the axis = ~730 days (2 years)
        const maxDaysOnAxis = 730;

        // 90% is the exact visual baseline where 0.0 sits
        // 10% is the top where 2.0 sits
        const baseline = 90;
        const topLimit = 10;
        const verticalRange = baseline - topLimit;

        const progressFactor = Math.min(days / maxDaysOnAxis, 1);

        // If days is 0, this returns exactly 90 (the bottom line)
        return baseline - (verticalRange * progressFactor);
    };

    return (
        <div className="flex h-full w-full bg-slate-50 border-l-[6px] border-b-[6px] border-l-violet-300 border-b-fuchsia-300 relative">
            <div className="flex flex-col h-full w-full bg-slate-50">
                <div className="relative h-full w-full">

                    {/* DATA POINTS */}
                    <svg className="absolute inset-0 h-full w-full overflow-visible z-10">
                        {processedData.map((ls, i) => {
                            const cx = getX(ls.level || 0);
                            const cy = getYTime(ls.daysSinceStart);

                            return (
                                <g key={i}>
                                    <circle
                                        cx={`${cx}%`}
                                        cy={`${cy}%`}
                                        r="5"
                                        fill="#3b82f6"
                                        stroke="#1d4ed8"
                                        strokeWidth="2"
                                        className="drop-shadow-sm"
                                    />

                                    <foreignObject
                                        x={`${cx}%`}
                                        y={`${cy}%`}
                                        width="120"
                                        height="50"
                                        style={{ transform: "translate(10px, -45px)" }}
                                        className="overflow-visible"
                                    >
                                        <div className="relative bg-white border border-slate-200 rounded-md shadow-md p-1.5 flex flex-col text-[9px] leading-tight font-bold text-slate-700">
                                            <span className="text-violet-600">Level: {ls.level}</span>
                                            <span className="text-slate-500 font-medium">Initial Date: {ls.startDate}</span>
                                            <div className="absolute -bottom-[3.5px] left-0 w-1.5 h-1.5 bg-white border-b border-l border-slate-200 rotate-45"></div>
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Y-AXIS (Visual Guide) */}
                    <svg className="relative h-full w-4 overflow-visible">
                        <line x1="0" y1="0" x2="0" y2="100%" stroke="#000000" strokeWidth="1" />
                        {[...Array(11)].map((_, i) => (
                            <g key={i} transform="translate(5, 0)">
                                {/* Aligning grid ticks to the same 10% - 90% range */}
                                <line x1="80%" y1={`${90 - (i * 8)}%`} x2="100%" y2={`${90 - (i * 8)}%`} stroke="#b900a6" strokeWidth="1" />
                                <text x="70%" y={`${90 - (i * 8)}%`} textAnchor="end" alignmentBaseline="middle" fontSize="10" fill="#8d008a">
                                    {(i * 0.2).toFixed(1)}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* X-AXIS (Visual Guide) */}
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