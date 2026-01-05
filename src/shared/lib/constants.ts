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

export const VYNC_API = {
    BASE: process.env.VYNC_API_URL || 'https://api.vync.live',
    AUTH: {
        LOGIN: '/api/v1/auth/login/',
        ME: '/api/v1/auth/users/me/',
        REFRESH: '/api/v1/auth/token/refresh/',
        LOGOUT: '/api/v1/auth/logout/', // Assuming this exists, or we handle it purely client-side
        REGISTER: '/api/v1/auth/users/', // Usually POST to users/
        USERS: (username: string) => `/api/v1/auth/users/${username}/`,
    },
    USERS: {
        PUBLIC_PROFILE: (username: string) => `/api/v1/users/${username}/`,
        POSTS: (username: string) => `/api/v1/users/${username}/posts/`,
    },
    FEED: {
        DISCOVERY: '/api/v1/feed/feeds/discovery/',
        POST: (id: string) => `/api/v1/feed/feeds/${id}/`,
        COMMENTS: (id: string) => `/api/v1/feed/posts/${id}/comments/`,
        LIKE: (id: string) => `/api/v1/feed/posts/${id}/like`,
    }
} as const;
