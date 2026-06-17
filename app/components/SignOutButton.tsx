"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
    const handleSignOut = () => {
        // 1. Wipe the language choice from the browser
        localStorage.removeItem("userLanguage");

        // 2. Sign out and go to the home page
        signOut({ callbackUrl: "/" });
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