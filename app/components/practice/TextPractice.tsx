import React from "react";

interface Props {
    practiceText: string;
    setPracticeText: (val: string) => void;
}

export const TextPractice = ({ practiceText, setPracticeText }: Props) => {
    return (
        <div className="flex flex-col items-center text-center animate-in zoom-in duration-500 w-full max-w-2xl">
            <h1 className="text-4xl font-black text-blue-700 mb-2 uppercase">WRITE IN THE BOX</h1>
            <p className="text-gray-600 mb-6 italic text-lg">
                Use the words you just learned to create original sentences.
            </p>
            <textarea
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
                placeholder="Start typing..."
                className="w-full h-64 p-8 rounded-[30px] border-2 border-blue-200 focus:border-blue-500 outline-none text-gray-800 text-xl resize-none shadow-xl bg-white/80"
            />
        </div>
    );
};