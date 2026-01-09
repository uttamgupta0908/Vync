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
    } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        if (axiosError.response?.status === 404) {
            // Attempt 2: Public User Profile if different from Auth profile
            const publicUrl = VYNC_API.USERS.PUBLIC_PROFILE(username);
            
            if (publicUrl !== VYNC_API.AUTH.USERS(username)) {
                try {
                    const response = await backendClient.get(publicUrl);
                    return NextResponse.json(response.data);
                } catch (fallbackError: unknown) {
                    const fbError = fallbackError as { response?: { status?: number } };
                    if (fbError.response?.status === 404) {
                        return NextResponse.json({ error: 'User not found' }, { status: 404 });
                    }
                }
            }
        }
        
        const { message } = mapError(error);
        const errWithResponse = error as { response?: { data?: unknown; status?: number }; message?: string };
        return NextResponse.json(
            { error: message, details: errWithResponse.response?.data || errWithResponse.message }, 
            { status: errWithResponse.response?.status || 500 }
        );
    }
}
