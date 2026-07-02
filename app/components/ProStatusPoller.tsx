"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProStatusPoller({ isPro }: { isPro: boolean }) {
    const router = useRouter()

    useEffect(() => {
        // If they are already PRO, no need to poll
        if (isPro) return;

        // Check the database state every 2 seconds via Next.js Server Actions/Router cache invalidation
        const interval = setInterval(() => {
            router.refresh()
        }, 2000)

        return () => clearInterval(interval)
    }, [isPro, router])

    return null
}