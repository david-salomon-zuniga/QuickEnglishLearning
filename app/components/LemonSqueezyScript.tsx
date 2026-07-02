"use client"

import Script from "next/script"

export default function LemonSqueezyScript({ userId }: { userId: string }) {
    return (
        <Script
            src="https://app.lemonsqueezy.com/js/lemon.js"
            strategy="afterInteractive"
            onReady={() => {
                // @ts-ignore
                if (window.createLemonSqueezy) {
                    // @ts-ignore
                    window.createLemonSqueezy();
                }

                // Bind directly to the global window object so it never unmounts
                // @ts-ignore
                window.LemonSqueezy = window.LemonSqueezy || {};
                // @ts-ignore
                window.LemonSqueezy.Setup = window.LemonSqueezy.Setup || function () { };

                // @ts-ignore
                window.LemonSqueezy.Setup({
                    eventHandler: (event: any) => {
                        console.log("Lemon Squeezy Global Event:", event.event);
                        if (event.event === 'Checkout.Closed') {
                            console.log("Checkout closed detected! Reloading in 1.5s...");

                        }
                    }
                });
            }}
        />
    )
}