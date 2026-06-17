import React from "react";

interface Props {
    practiceImage: string;
    practiceText: string;
    setPracticeText: (val: string) => void;
    speak: (text: string) => void;
}

export const ImageParagraphPractice = ({
    practiceImage,
    practiceText,
    setPracticeText,
    speak
}: Props) => {
    return (
        /* 
           Added 'flex-1' to take available space and 'min-h-0' 
           to allow internal shrinking if the screen is small.
        */
        <div className="flex flex-col items-center text-center animate-in zoom-in duration-500 w-full flex-1 min-h-0 px-2 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black text-blue-600 mb-1">PRACTICE</h1>
            <p className="text-gray-500 mb-4 italic text-base md:text-lg">
                Write a short paragraph about this image.
            </p>

            {/* 
                Flexible Image Container: 
                Uses flex-grow but caps at a reasonable height.
            */}
            <div className="w-full flex-1 min-h-[120px] max-h-[300px] mb-4">
                <img
                    src={practiceImage}
                    alt="Practice"
                    className="w-full h-full object-cover rounded-3xl shadow-lg border-4 border-white"
                />
            </div>

            {/* 
                Textarea: 
                Slightly smaller height to prioritize space for buttons.
            */}
            <textarea
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
                placeholder="Write here..."
                className="w-full h-24 md:h-32 p-4 rounded-3xl border-2 border-blue-100 focus:border-blue-400 outline-none text-gray-700 text-lg resize-none bg-white/50 shadow-inner"
            />
        </div>
    );
};