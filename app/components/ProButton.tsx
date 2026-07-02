"use client"

import { useState } from "react";

interface ProButtonProps {
    //checkoutUrl: string; // We don't use this hardcoded string anymore!
    isPro: boolean;
    userId: string;
}

export default function ProButton({ isPro, userId }: ProButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (isPro) {
        return (
            <div className="px-2 py-1 md:px-4 md:py-1.5 bg-gray-200 text-gray-500 text-xs md:text-sm font-bold rounded-full cursor-default border border-gray-300">
                PRO VERSION!
            </div>
        )
    }

    // 1. Map your 4 Vercel Variant IDs to their display data
    const plans = [
        { name: "Monthly Plan", price: "$10.00", desc: "Billed monthly", id: process.env.NEXT_PUBLIC_LS_MONTHLY_VARIANT_ID },
        { name: "Quarterly Plan", price: "$25.00", desc: "Billed every 3 months", id: process.env.NEXT_PUBLIC_LS_QUARTERLY_VARIANT_ID },
        { name: "6-Month Plan", price: "$45.00", desc: "Billed every 6 months", id: process.env.NEXT_PUBLIC_LS_SIX_MONTHS_VARIANT_ID },
        { name: "Annual Plan", price: "$80.00", desc: "Billed yearly", id: process.env.NEXT_PUBLIC_LS_YEARLY_VARIANT_ID },
    ];

    const handleOpenCheckout = (variantId: string) => {
        // 🔍 Print exactly what ID is being caught
        console.log("🚀 Clicked Variant ID:", variantId);


        if (!variantId) {
            alert("Variant ID missing. Check your Vercel Environment Variables!");
            return;
        }

        // 2. Build the dynamic URL using the specific clicked Variant ID
        const finalUrl = `https://salomonapps.lemonsqueezy.com/checkout/buy/${variantId}?checkout[custom][user_id]=${userId}&embed=1`;
        console.log("🔗 Opening URL:", finalUrl);
        // @ts-ignore
        if (window.LemonSqueezy) {
            // @ts-ignore
            window.LemonSqueezy.Url.Open(finalUrl);

            // 1. Instantly hide your pricing plan modal for the clean UI!
            setIsOpen(false);

            // 2. Track when they return to the app from the payment flow
            const handleWindowFocus = () => {
                console.log("👋 User returned to Dashboard! Reloading to fetch fresh Pro status...");

                // Give the Go webhook 1.5 seconds to commit to the database first
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

                // Clean up the window listener immediately so it doesn't loop fire
                window.removeEventListener("focus", handleWindowFocus);
            };

            // Attach the focus listener
            window.addEventListener("focus", handleWindowFocus);
        }
    };

    return (
        <>
            {/* The main navbar button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-2 py-1 md:px-4 md:py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs md:text-sm font-bold rounded-full hover:shadow-md transition shadow-sm cursor-pointer"
            >
                PRO
            </button>

            {/* The 4-Option Modal Popup */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Choose your Premium Plan</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
                        </div>

                        <div className="space-y-4">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className="border border-gray-200 p-4 rounded-2xl flex items-center justify-between hover:border-orange-400 transition"
                                >
                                    <div>
                                        <h4 className="font-bold text-gray-800">{plan.name}</h4>
                                        <p className="text-xs text-gray-500">{plan.desc}</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <span className="font-extrabold text-lg text-gray-900">{plan.price}</span>
                                        <button
                                            onClick={() => handleOpenCheckout(plan.id || "")}
                                            className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-orange-500 transition cursor-pointer"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}