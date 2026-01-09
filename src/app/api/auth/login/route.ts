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
        let errorData: { error?: string } = {};
        let statusCode = 500;
        let errorMessage: string | undefined;
        
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response?: { data?: unknown; status?: number }; message?: string };
            errorData = axiosError.response?.data as { error?: string } || {};
            statusCode = axiosError.response?.status || 500;
            errorMessage = axiosError.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        console.error('Login error:', errorData || errorMessage);
        return NextResponse.json(
            { 
                error: 'Authentication failed',
                details: errorData || errorMessage 
            },
            { status: statusCode }
        );
    }
}
