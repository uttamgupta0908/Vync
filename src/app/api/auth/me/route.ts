import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    
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
        console.error('Fetch me error:', error.response?.data || error.message);
        // If 401, we might should clear cookies, but for now just return null user
        return NextResponse.json({ user: null });
    }
}
