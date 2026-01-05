import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { VYNC_API } from '@/src/shared/lib/constants';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;

    // Strategy: Try the Auth Users endpoint (most detailed) via specialized backendClient
    // If that returns 404, fallback to strictly public endpoint (if exists)
    // or return 404.
    
    try {
        // Attempt 1: Authenticated User Profile
        // backendClient automatically handles Authorization header from cookies
        const response = await backendClient.get(VYNC_API.AUTH.USERS(username));
        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response?.status === 404) {
            // Attempt 2: Public User Profile
            // Only try if specific public endpoint differs and exists
            try {
                // We use backendClient here too, as it won't hurt to send auth even generally,
                // or we could use a plain axios if we wanted strictly anon.
                // But Vync API typically accepts auth everywhere for context (e.g. "is_following" status).
                const publicUrl = VYNC_API.USERS.PUBLIC_PROFILE(username);
                
                // Avoid infinite loop if URLs are identical
                if (publicUrl !== VYNC_API.AUTH.USERS(username)) {
                     const response = await backendClient.get(publicUrl);
                     return NextResponse.json(response.data);
                }
            } catch (fallbackError: any) {
                 // Fallback also failed
                 if (fallbackError.response?.status === 404) {
                     return NextResponse.json({ error: 'User not found' }, { status: 404 });
                 }
            }
            // If first attempt failed 404 and we had no distinct second attempt or it failed 404
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
      
         return NextResponse.json(
            { error: error.message || 'Failed to fetch user' }, 
            { status: error.response?.status || 500 }
        );
    }
}
