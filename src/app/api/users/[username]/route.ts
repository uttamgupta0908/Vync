import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { VYNC_API } from '@/src/shared/lib/constants';
import { mapError } from '@/src/utils/error-mapping';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;

    try {
        // Strategy: Try the Auth Users endpoint (most detailed) via specialized backendClient
        // backendClient automatically handles Authorization header from cookies
        const response = await backendClient.get(VYNC_API.AUTH.USERS(username));
        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response?.status === 404) {
            // Attempt 2: Public User Profile if different from Auth profile
            const publicUrl = VYNC_API.USERS.PUBLIC_PROFILE(username);
            
            if (publicUrl !== VYNC_API.AUTH.USERS(username)) {
                try {
                    const response = await backendClient.get(publicUrl);
                    return NextResponse.json(response.data);
                } catch (fallbackError: any) {
                    if (fallbackError.response?.status === 404) {
                        return NextResponse.json({ error: 'User not found' }, { status: 404 });
                    }
                }
            }
        }
        
        const { message } = mapError(error);
        return NextResponse.json(
            { error: message, details: error.response?.data || error.message }, 
            { status: error.response?.status || 500 }
        );
    }
}
