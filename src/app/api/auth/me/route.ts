import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;
    
    if (!accessToken && !refreshToken) {
        return NextResponse.json({ user: null });
    }

    // If access token is missing but refresh token exists, try to refresh first
    if (!accessToken && refreshToken) {
        try {
            const refreshRes = await axios.post('https://api.vync.live/api/v1/auth/token/refresh/', {
                refresh: refreshToken
            });
            
            const { access, refresh } = refreshRes.data;
            accessToken = access;
            
            // Set new cookies
            cookieStore.set('access_token', access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60,
                path: '/',
            });
            
            if (refresh) {
                cookieStore.set('refresh_token', refresh, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });
            }
        } catch (error) {
            console.error('Initial refresh in /me failed:', error);
            return NextResponse.json({ user: null });
        }
    }

    if (!accessToken) {
        return NextResponse.json({ user: null });
    }
    
    try {
        // Call Real API
        const response = await axios.get('https://api.vync.live/api/v1/auth/users/me/', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return NextResponse.json({
            user: response.data
        });
    } catch (error: any) {
        // If 401, try to refresh token
        if (error.response?.status === 401) {
            const refreshToken = cookieStore.get('refresh_token')?.value;
            if (refreshToken) {
                try {
                    const refreshRes = await axios.post('https://api.vync.live/api/v1/auth/token/refresh/', {
                        refresh: refreshToken
                    });
                    
                    const { access, refresh } = refreshRes.data;
                    
                    // Update cookies
                    cookieStore.set('access_token', access, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 60 * 60, // 1 hour
                        path: '/',
                    });
                    
                    if (refresh) {
                        cookieStore.set('refresh_token', refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 60 * 60 * 24 * 7,
                            path: '/',
                        });
                    }
                    
                    // Retry original call with new token
                    const retryRes = await axios.get('https://api.vync.live/api/v1/auth/users/me/', {
                        headers: {
                            Authorization: `Bearer ${access}`
                        }
                    });
                    
                    return NextResponse.json({ user: retryRes.data });
                } catch (refreshError) {
                    console.error('Auto-refresh in /me failed:', refreshError);
                }
            }
        }
        
        console.error('Fetch me error:', error.response?.data || error.message);
        return NextResponse.json({ user: null });
    }
}
