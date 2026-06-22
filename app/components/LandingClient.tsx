"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { API_BASE } from '@/lib/api';

export default function LandingClient() {
    const [word, setWord] = useState({ en: "", es: "" })

    useEffect(() => {
        fetch(`${API_BASE}/api/word`)
            .then(res => res.json())
            .then(data => setWord(data))
    }, [])

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

            {/* 1. HERO SECTION (Main Section) */}
            <section className="py-12 md:py-20 px-6 md:px-10 bg-gradient-to-b from-blue-50 to-white text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Master English<br />
                    <span className="text-blue-600 underline">Faster Than Ever</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-4">
                    This platform will help you bridge the gap between your English learning and practice progress.
                </p>

                {/* Buttons Container - Stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href="/register" className="w-full md:w-auto bg-green-300 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg">
                        Start Learning for Free
                    </Link>

                    <Link href="/login" className="w-full md:w-auto bg-pink-300 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg">
                        Login
                    </Link>
                </div>
            </section>

            {/* 2. FEATURES */}
            <section className="py-16 px-6 md:px-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center md:text-left">
                    <div className="text-4xl mb-4 text-blue-500">⚡</div>
                    <h3 className="text-xl font-bold mb-2">Pro Access: Unlimited Sessions</h3>
                    <p className="text-gray-600">Unlock unlimited conversations with Amy and remove time limits on your daily practice sessions.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center md:text-left">
                    <div className="text-4xl mb-4 text-blue-500">📚</div>
                    <h3 className="text-xl font-bold mb-2">Advanced Pronunciation Analysis</h3>
                    <p className="text-gray-600">Receive detailed, real-time feedback on your pronunciation and fluency, designed to accelerate your learning.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center md:text-left">
                    <div className="text-4xl mb-4 text-blue-500">🤖</div>
                    <h3 className="text-xl font-bold mb-2">Practice your learning</h3>
                    <p className="text-gray-600">Access a summary practice to see common speech exercises.</p>
                </div>
            </section>

            {/* 3. BENEFITS */}
            <section className="py-16 px-6 md:px-10 bg-blue-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Why use our method?</h2>
                    <ul className="space-y-6 text-left inline-block">
                        <li className="flex items-start md:items-center text-lg md:text-xl">
                            <span className="mr-3">✅</span> Native pronunciation for every single word.
                        </li>
                        <li className="flex items-start md:items-center text-lg md:text-xl">
                            <span className="mr-3">✅</span> Contextual learning instead of boring lists.
                        </li>
                        <li className="flex items-start md:items-center text-lg md:text-xl">
                            <span className="mr-3">✅</span> Available on all your devices.
                        </li>
                    </ul>
                </div>
            </section>

            {/* 4. SOCIAL PROOF */}
            <section className="py-16 px-6 md:px-10 text-center">
                <p className="text-gray-400 uppercase tracking-widest mb-10 text-sm">Trusted by students worldwide</p>
                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 grayscale opacity-60 italic text-xl md:text-2xl font-serif text-gray-500">
                    <span>"Unbelievably fast"</span>
                    <span>"The best UI"</span>
                    <span>"Finally, a Go-based app!"</span>
                </div>
            </section>

            {/* 5. CALL TO ACTION (Final) */}
            <section className="py-16 px-6 md:px-10 bg-gray-50 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to change your life?</h2>
                <p className="text-gray-600 mb-10">Join over 1,000 students today.</p>
                <Link href="/dashboard" className="inline-block w-full md:w-auto bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-blue-700 transition shadow-xl">
                    Get Started Now
                </Link>
            </section>

            <footer className="py-10 text-center text-gray-400 text-sm border-t border-gray-100">
                &copy; {new Date().getFullYear()} QuickEnglishLearning. All rights reserved.
            </footer>
        </div>
    )
}