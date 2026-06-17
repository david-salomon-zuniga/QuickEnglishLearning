"use client"

import Script from "next/script"
import { useRouter } from "next/navigation"

export default function LemonSqueezyScript({ userId }: { userId: string }) {
    const router = useRouter()

    return (
        <Script
            src="https://app.lemonsqueezy.com/js/lemon.js"
            strategy="afterInteractive"
            onReady={() => {
                // @ts-ignore
                if (window.createLemonSqueezy) {
                    // @ts-ignore
                    window.createLemonSqueezy();

                    // Escuchar cuando el checkout se cierra
                    // @ts-ignore
                    window.LemonSqueezy.Setup({
                        eventHandler: (event: any) => {
                            if (event.event === 'Checkout.Closed') {
                                // Forzamos un refresco completo para que 
                                // Server Components vuelvan a pedir datos a la DB
                                router.refresh();
                            }
                        }
                    });
                }
            }}
        />
    )
}