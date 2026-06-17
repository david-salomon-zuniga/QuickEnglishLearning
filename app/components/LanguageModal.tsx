"use client";
import { useState, useEffect } from "react";

export default function LanguageModal() {
    const [isOpen, setIsOpen] = useState(false); // Start as false to prevent "flicker"

    useEffect(() => {
        // Check if the user already picked a language before
        const savedLanguage = localStorage.getItem("userLanguage");
        if (!savedLanguage) {
            setIsOpen(true);
        }
    }, []);

    const selectLanguage = (lang: string) => {
        localStorage.setItem("userLanguage", lang); // Save the choice!
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
                <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-gray-600 mb-6">Which language are we practicing?</p>

                <div className="space-y-4">
                    <button
                        onClick={() => selectLanguage("en")}
                        className="w-full py-4 border-2 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition font-bold flex items-center justify-center gap-3"
                    >
                        <span className="text-2xl">🇺🇸</span> English
                    </button>

                    <button
                        onClick={() => selectLanguage("es")}
                        className="w-full py-4 border-2 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition font-bold flex items-center justify-center gap-3"
                    >
                        <span className="text-2xl">🇲🇽</span> Spanish
                    </button>
                </div>
            </div>
        </div>
    );
}