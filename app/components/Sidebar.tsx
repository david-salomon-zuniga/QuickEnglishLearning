"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <aside
                className={`fixed inset-y-0 left-0 z-50 ${isOpen ? "w-64" : "w-12"
                    } bg-white border-r transition-all duration-300 flex flex-col p-2 shadow-xl`}
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-10 bg-blue-600 text-white rounded-full p-1 shadow-md hover:bg-blue-700 z-50"
                >
                    {isOpen ? "←" : "→"}
                </button>

                {/* Logo */}
                <div className={`font-bold text-blue-600 mb-10 overflow-hidden whitespace-nowrap transition-opacity duration-300 ${!isOpen ? "opacity-0" : "opacity-100 text-center"}`}>
                    MyLingoApp
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-4 flex flex-col items-center lg:items-start">

                    {/* OPTION 1: DASHBOARD */}
                    <Link href="/dashboard" className="w-full">
                        <div className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer w-full justify-center lg:justify-start">
                            <span className="text-xl">🏠</span>
                            {isOpen && <span className="text-sm text-gray-600">Dashboard</span>}
                        </div>
                    </Link>

                    {/* OPTION 2: STATISTICS */}
                    <Link href="/dashboard/statistics" className="w-full">
                        <div className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer w-full justify-center lg:justify-start">
                            <span className="text-xl">📊</span>
                            {isOpen && <span className="text-sm text-gray-600">Statistics</span>}
                        </div>
                    </Link>

                </nav>
            </aside>
        </>
    );
}