import { createClient } from '@supabase/supabase-js';
import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

export async function POST() {
    console.log("DEBUG: route.ts reached"); // Check your terminal (npm run dev)
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Tell Go to do ALL the work (Cleanup DB + Auth)
    const goRes = await fetch(`${API_BASE}/api/delete-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({ userId: session.user.id })
    });

    if (!goRes.ok) {
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}