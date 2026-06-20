// app/dashboard/profile/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete your account? This will erase all your progress and data. This action cannot be undone."
        );

        if (!confirmed) return;

        setLoading(true);
        try {
            // This calls the API route we created in step 1
            const res = await fetch("/api/delete-user", {
                method: "DELETE", // Coincide con lo que espera tu Go
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                router.push("/");
                router.refresh();
            } else {
                alert("Error deleting account. Please contact support.");
            }
        } catch (err) {
            console.error(err);
            alert("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h1>

                {/* Danger Zone */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                    <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Permanently delete your account and all associated learning data from our systems.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        className="w-full md:w-auto bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-6 rounded-xl border border-red-200 transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Delete My Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}