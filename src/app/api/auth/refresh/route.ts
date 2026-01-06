import { NextResponse } from 'next/server';
import axios from 'axios';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { getRefreshToken, setAuthCookies } from '@/src/shared/lib/server/auth-utils';
import { VYNC_API } from '@/src/shared/lib/constants';

/**
 * Token Refresh API Route
 * Explicitly exchanges refresh token for new access/refresh tokens
 */
export async function POST() {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        return NextResponse.json(
            { error: 'No refresh token available' },
            { status: 401 }
        );
    }

    try {
        // Explicitly call the refresh endpoint on the backend
        const response = await backendClient.post(VYNC_API.AUTH.REFRESH, {
            refresh: refreshToken,
        });

        const { access, refresh } = response.data;

        // Update secure HTTP-only cookies with new tokens
        await setAuthCookies(access, refresh);

        return NextResponse.json({ accessToken: access });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Refresh error details:', error.response?.data ?? error.message);
        } else {
            console.error('Refresh error:', error instanceof Error ? error.message : 'Unknown error');
        }

        return NextResponse.json(
            { error: 'Session session has expired. Please login again.' },
            { status: 401 }
        );
    }
}
