// src/app/components/charts/ChartContainer.tsx
import React from 'react';

interface ChartContainerProps {
    title: string;
    width?: number;
    height?: number;
    children: React.ReactNode;
}

const ChartContainer = ({ title, width = 300, height = 150, children }: ChartContainerProps) => {
    return (
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-2xl">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                {title}
            </h3>
            <svg
                width="100%"
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className="overflow-visible"
            >
                {/* Background Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                    <line
                        key={p}
                        x1="0"
                        y1={height * p}
                        x2={width}
                        y2={height * p}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}

                {/* The Actual Data (Passed from children) */}
                {children}
            </svg>
        </div>
    );
};

export default ChartContainer;