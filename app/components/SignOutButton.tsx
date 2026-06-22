"use client";
import { supabase } from "@/app/utils/supabase";

export default function SignOutButton() {
    const handleSignOut = async () => {
        // 1. Wipe the language choice from the browser
        localStorage.removeItem("userLanguage");

        // 2. Sign out and redirect
        // Use the window.location.origin to ensure it stays on your current domain
        // 2. Sign out and redirect
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
            Sign Out
        </button>
    );
}