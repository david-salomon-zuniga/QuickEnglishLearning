import React from "react";

interface Props {
    practiceText: string;
    setPracticeText: (val: string) => void; // Added this line to fix the error
    speakQuestions: (text: string) => void; // Updated to accept the string
}

export const ListenSpeakPractice = ({
    practiceText,
    speakQuestions
}: Props) => {
    return (
        <div className="flex flex-col items-center text-center animate-in slide-in-from-left duration-500 w-full max-w-2xl">
            <h1 className="text-4xl font-black text-red-600 mb-2">LISTEN & SPEAK</h1>
            <p className="text-gray-500 mb-2 italic text-lg">
                Listen to questions and speak your answer. Use the words you just learned.
            </p>
            <button
                // FIX: Use an arrow function to pass practiceText instead of the Mouse Event
                onClick={() => speakQuestions(practiceText)}
                className="mb-4 text-sm font-bold text-red-600"
            >
                ▶ Hear Questions
            </button>
            <textarea
                defaultValue={practiceText}
                //readOnly
                placeholder="Write in here your answer..."
                className="w-full h-24 p-4 rounded-2xl border-2 border-red-100 outline-none text-red-900 text-lg resize-none"
            />
        </div>
    );
};