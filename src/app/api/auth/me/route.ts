import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { VYNC_API } from '@/src/shared/lib/constants';

export async function GET() {
    try {
        // backendClient handles token attachment and auto-refresh
        const response = await backendClient.get(VYNC_API.AUTH.ME);
        
        return NextResponse.json({
            user: response.data
        });
    } catch (error: unknown) {
        // If 401 even after retry, return null user (not logged in)
        if (typeof error === 'object' && error !== null && 'response' in  error) {
            const axiosError = error as { response?: { status?: number; data?: unknown }; message?: string };
            if (axiosError.response?.status === 401) {
                return NextResponse.json({ user: null });
            }
            console.error('Fetch me error:', axiosError.response?.data || axiosError.message);
        }
        return NextResponse.json({ user: null }); // Fail safe to null
    }
}
