import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { VYNC_API } from '@/src/shared/lib/constants';
import { setAuthCookies } from '@/src/shared/lib/server/auth-utils';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Call Real API
        const response = await backendClient.post(VYNC_API.AUTH.REGISTER, body);
        
        // If the registration automatically logs in the user
        const { access, refresh, user } = response.data;
        if (access) {
            await setAuthCookies(access, refresh);
        }
        
        return NextResponse.json(response.data, { status: 201 });
    } catch (error: any) {
        console.error('Register error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data?.error || 'Registration failed' },
            { status: error.response?.status || 500 }
        );
    }
}
