import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;
        
        console.warn(`[Login Proxy] Attempting login for: ${email}`);

        // Call Real API
        const response = await axios.post('https://api.vync.live/api/v1/auth/login/', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { access, refresh, user } = response.data;
        
        // Set HttpOnly cookies for tokens
        const cookieStore = await cookies();
        
        // Access Token (short lived)
        cookieStore.set('access_token', access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        // Refresh Token (long lived)
        cookieStore.set('refresh_token', refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        
        return NextResponse.json({
            user,
            access, // Optionally return to client if needed by legacy code, but preferably rely on cookies
            refresh 
        });
    } catch (error: any) {
        console.error('Login error:', error.response?.data || error.message);
        return NextResponse.json(
            { 
                error: 'Authentication failed',
                details: error.response?.data || error.message 
            },
            { status: error.response?.status || 500 }
        );
    }
}
