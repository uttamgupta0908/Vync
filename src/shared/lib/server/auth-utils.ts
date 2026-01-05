import { cookies } from 'next/headers';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
};

export const AUTH_COOKIES = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
};

export async function setAuthCookies(accessToken: string, refreshToken?: string) {
    const cookieStore = await cookies();
    
    // Set Access Token (1 hour)
    cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60,
    });

    // Set Refresh Token (7 days)
    if (refreshToken) {
        cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 60 * 60 * 24 * 7,
        });
    }
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN);
    cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN);
}

export async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
}
