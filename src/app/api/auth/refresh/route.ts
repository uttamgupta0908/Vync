import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    
    if (!refreshToken) {
        return NextResponse.json(
            { error: 'No refresh token' },
            { status: 401 }
        );
    }
    
    try {
        // Call Real API
        // Payload: { refresh: "token" }
        const response = await axios.post('https://api.vync.live/api/v1/auth/token/refresh/', {
            refresh: refreshToken
        });
        
        const { access, refresh } = response.data;
        
        // Update Access Token (always returned)
        cookieStore.set('access_token', access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        // Update Refresh Token (if returned - some APIs rotate it)
        if (refresh) {
            cookieStore.set('refresh_token', refresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, 
                path: '/',
            });
        }
        
        return NextResponse.json({ accessToken: access });
    } catch (error: any) {
        console.error('Refresh error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: 'Refresh failed' },
            { status: 401 }
        );
    }
}
