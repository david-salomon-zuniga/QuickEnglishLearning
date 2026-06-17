import React from "react";

interface Props {
    actionImage: string;
    practiceText: string;
    setPracticeText: (val: string) => void;
}

export const ActionReactionPractice = ({
    actionImage,
    practiceText,
    setPracticeText
}: Props) => {
    return (
        <div className="flex flex-col items-center text-center animate-in zoom-in duration-500 w-full flex-1 min-h-0 px-4 max-w-5xl mx-auto overflow-hidden">
            {/* Title reduced to text-2xl */}
            <h1 className="text-2xl font-black text-green-600 mb-1">ACTION & REACTION</h1>

            <p className="text-gray-500 mb-2 italic text-sm md:text-base">
                Write your reaction to this situation.
            </p>

            {/* Flexible Image Container - Reduced size and added max-width for better proportions */}
            <div className="w-full max-w-md flex-1 min-h-[120px] max-h-[250px] md:max-h-[300px] mb-4">
                <img
                    src={actionImage}
                    alt="Action"
                    className="w-full h-full object-cover rounded-3xl shadow-lg border-4 border-white"
                />
            </div>

            {/* Optimized Textarea */}
            <textarea
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
                placeholder="Type reaction..."
                className="w-full h-20 md:h-28 p-5 rounded-3xl border-2 border-green-100 focus:border-green-400 outline-none text-gray-700 text-lg resize-none shadow-inner bg-white/60 mb-1"
            />
        </div>
    );
};