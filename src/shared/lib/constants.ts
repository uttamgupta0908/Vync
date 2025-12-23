/**
 * App Constants
 */

export const APP_NAME = 'Vync';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const ROUTES = {
    HOME: '/',
    PROFILE: (username: string) => `/profile/${username}`,
    POST: (id: string) => `/details/${id}`,
    COMMUNITIES: '/communities',
    MESSAGES: '/messages',
    LIVE: '/live',
} as const;

export const QUERY_STALE_TIME = {
    SHORT: 10000,    // 10 seconds
    MEDIUM: 30000,   // 30 seconds
    LONG: 60000,     // 1 minute
    VERY_LONG: 300000, // 5 minutes
} as const;
