import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/src/shared/lib/server/auth-utils';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { VYNC_API } from '@/src/shared/lib/constants';

export async function POST() {
    try {
        // Optional: Call backend logout
        await backendClient.post(VYNC_API.AUTH.LOGOUT).catch(() => {
            // Silently ignore logout errors from backend
        });
    } finally {
        // Always clear cookies
        await clearAuthCookies();
    }
    
    return NextResponse.json({ success: true });
}
