"use client";
import { useState } from "react";
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";

export default function AcceptTermsPage() {
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAccept = async () => {
        if (!agreed) return;
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase
                .from('profiles')
                .update({ terms_accepted: true })
                .eq('id', user.id);

            // Inside handleAccept
            if (!error) {
                // Force a complete browser refresh to the dashboard
                // This ignores all client-side routing caches
                window.location.assign('/dashboard');
            } else {
                alert("Error saving your acceptance. Please try again.");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Terms and Conditions</h1>

                <textarea
                    readOnly
                    className="w-full h-40 p-4 text-xs text-gray-600 bg-gray-50 border rounded-lg mb-4 resize-none"
                    value={`TERMS OF SERVICE AND PRIVACY DISCLOSURE

1. EDUCATIONAL PURPOSES ONLY: This application is a prototype created strictly for learning and demonstration purposes. It is provided "AS-IS" without any warranties regarding functionality, accuracy, or uptime.

2. LIMITATION OF LIABILITY: By using this app, you agree that the developer is NOT responsible for any data loss, system errors, or any damages resulting from the use of this software. You use this platform at your own risk.

3. VOICE & AUDIO DATA: This app uses microphone access for real-time AI processing. We DO NOT retain, store, or share your voice recordings on our servers. All audio processing is handled in-memory and discarded immediately after the session ends.

4. NO DATA GUARANTEES: Features may be added, modified, or removed without notice. We do not guarantee that your progress, vocabulary stats, or account data will be preserved indefinitely.

5. THIRD-PARTY SERVICES: We use Google for authentication and Supabase for data storage. By signing in, you also acknowledge the terms of these third-party providers.

By checking the box below, you release the developer from all liability and confirm you understand the experimental nature of this tool.`}
                />

                <div className="flex items-start gap-3 mb-6">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-5 h-5 cursor-pointer"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                        I have read and agree to the Terms of Service and Privacy Policy.
                    </label>
                </div>

                <button
                    onClick={handleAccept}
                    disabled={!agreed || loading}
                    className={`w-full py-4 rounded-full font-bold transition ${agreed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Processing..." : "Accept and Continue"}
                </button>
            </div>
        </div>
    );
}