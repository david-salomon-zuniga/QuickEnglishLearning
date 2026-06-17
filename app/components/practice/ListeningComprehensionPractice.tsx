import React from "react";

interface Props {
    id: number | string,
    type: string,
    audioUrl: string;
    practiceText: string;
    setPracticeText: (val: string) => void;
}

export const ListeningComprehensionPractice = ({
    id,
    type,
    audioUrl,
    practiceText,
    setPracticeText
}: Props) => {
    return (
        <div className="flex flex-col items-center text-center animate-in fade-in duration-500 w-full max-w-2xl">
            <h1 className="text-4xl font-black text-purple-600 mb-2 uppercase">Conversation Challenge</h1>
            <p className="text-gray-500 mb-6 italic text-lg">
                Listen carefully to the dialogue. Use the words you just learned.
            </p>
            <div className="w-full bg-white/80 p-6 rounded-3xl shadow-md border-2 border-purple-100 mb-6">
                <audio controls preload="none" className="w-full h-12">
                    <source src={audioUrl} type="audio/mpeg" />
                </audio>
            </div>
            <textarea
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
                placeholder="Type what you heard..."
                className="w-full h-32 p-6 rounded-3xl border-2 border-purple-100 focus:border-purple-400 outline-none text-gray-700 text-lg resize-none shadow-inner bg-white/50"
            />
        </div>
    );
};