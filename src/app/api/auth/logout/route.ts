import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST() {
    // Clear cookies
    const cookieStore = await cookies();
    
    cookieStore.set('access_token', '', { maxAge: 0, path: '/' });
    cookieStore.set('refresh_token', '', { maxAge: 0, path: '/' });
    
    // Optional: Call backend logout if needed (fire and forget)
    // await axios.post('https://api.vync.live/api/v1/auth/logout/');
    
    return NextResponse.json({ success: true });
}
