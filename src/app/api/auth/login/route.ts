import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { setAuthCookies } from '@/src/shared/lib/server/auth-utils';
import { VYNC_API } from '@/src/shared/lib/constants';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;
        
        console.warn(`[Login Proxy] Attempting login for: ${email}`);

        // Call Real API
        const response = await backendClient.post(VYNC_API.AUTH.LOGIN, body);
        const { access, refresh, user } = response.data;
        
        // Use shared cookie utility
        await setAuthCookies(access, refresh);
        
        return NextResponse.json({
            user,
            access, 
            refresh 
        });
    } catch (error: unknown) {
        const err = error as { response?: { data?: any; status?: number }; message?: string };
        console.error('Login error:', err.response?.data || err.message);
        return NextResponse.json(
            { 
                error: 'Authentication failed',
                details: err.response?.data || err.message 
            },
            { status: err.response?.status || 500 }
        );
    }
}
