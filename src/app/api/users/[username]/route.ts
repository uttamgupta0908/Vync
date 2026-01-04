import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const endpoints = [
        `https://api.vync.live/api/v1/auth/users/${username}/`,
        `https://api.vync.live/api/v1/users/${username}/`
    ];

    let lastError;

    for (const endpoint of endpoints) {
        try {
            const headers: Record<string, string> = {};
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const response = await axios.get(endpoint, { headers });
            return NextResponse.json(response.data);
        } catch (error: any) {
             // If 404, try next endpoint. If other error, log it.
             if (error.response?.status === 404) {
                 lastError = error;
                 continue;
             }
             
             // If 401, maybe token expired? (Simplification: just return error or try public without token?)
             // For now, let's just fail or try next.
             lastError = error;
        }
    }

    // If we get here, all attempts failed
    if (lastError?.response?.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
        { error: lastError?.message || 'Failed to fetch user' }, 
        { status: lastError?.response?.status || 500 }
    );
}
