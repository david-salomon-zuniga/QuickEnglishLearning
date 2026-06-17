import React from "react";

interface Props {
    id: number | string; // Identificador único
    type: string; // El protocolo para distinguir la fuente
    videoUrl: string;
    title: string;
    questions: string;
    practiceText: string;
    setPracticeText: (val: string) => void;
}

export const VideoPractice = ({
    id, // <--- Asegúrate de tener esto
    type,// <--- Y esto
    videoUrl,
    title,
    questions,
    practiceText,
    setPracticeText
}: Props) => {
    return (
        <div className="flex flex-col items-center text-center w-full px-4">
            {/* 1. Smaller Title to save vertical space */}
            <h1 className="text-lg md:text-xl font-black text-amber-600 mb-2 uppercase">
                {title}
            </h1>

            {/* 2. Flexible Video Container: Use flex-1 and max-height so it doesn't push the buttons out */}
            <div className="w-full max-w-sm md:max-w-md aspect-video bg-black rounded-2xl overflow-hidden shadow-md mb-4">
                {type === "youtube" ? (
                    <iframe
                        className="w-full h-full"
                        src={videoUrl}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <video controls preload="none" className="w-full h-full">
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* 3. Question box: Tightened padding */}
            <div className="bg-white/60 p-4 rounded-xl border border-amber-100 mb-4 w-full max-w-4xl">
                <p className="text-gray-700 font-medium text-sm md:text-base">
                    {questions}
                </p>
            </div>

            {/* Shrink Textarea: Reduced height from h-24 to h-16/20 */}
            <div className="w-full max-w-xl mx-auto">
                <textarea
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-base h-24 md:h-32 resize-none"
                    placeholder="Write things related to the video..."
                    value={practiceText}
                    onChange={(e) => setPracticeText(e.target.value)}
                />
            </div>
        </div>
    );
};