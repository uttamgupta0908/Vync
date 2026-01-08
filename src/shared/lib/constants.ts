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
    SHORT: 10000,    // 10 sec
    MEDIUM: 30000,   // 30 sec
    LONG: 60000,     // 1 min
    VERY_LONG: 300000, // 5 min
} as const;

export const VYNC_API = {
    BASE: process.env.VYNC_API_URL || 'https://api.vync.live',
    AUTH: {
        LOGIN: '/api/v1/auth/login/',
        ME: '/api/v1/auth/users/me/',
        REFRESH: '/api/v1/auth/token/refresh/',
        LOGOUT: '/api/v1/auth/logout/',
        REGISTER: '/api/v1/auth/users/',
        USERS: (username: string) => `/api/v1/auth/users/${username}/`,
    },
    USERS: {
        PUBLIC_PROFILE: (idOrUsername: string) => `/api/v1/auth/users/${idOrUsername}/`,
        POSTS: (idOrUsername: string) => `/api/v1/users/${idOrUsername}/posts/`,
        FOLLOW: (idOrUsername: string) => `/api/v1/auth/users/${idOrUsername}/follow/`,
        UNFOLLOW: (idOrUsername: string) => `/api/v1/auth/users/${idOrUsername}/unfollow/`,
    },
    FEED: {
        DISCOVERY: '/api/v1/feed/feeds/discovery/',
        WHATS_HAPPENING: '/api/v1/feed/feeds/whats-happening/',
        POST: (id: string) => `/api/v1/feed/feeds/${id}/`,
        COMMENTS: (id: string) => `/api/v1/feed/posts/${id}/comments/`,
        LIKE: (id: string) => `/api/v1/feed/feeds/${id}/like/`,
        SAVE: (id: string) => `/api/v1/feed/feeds/${id}/save/`,
    },
    COMMUNITIES: {
        TRENDING: '/api/v1/community/communities/trending/',
        LIST: '/api/v1/community/communities/',
        DETAIL: (slug: string) => `/api/v1/community/communities/${slug}/`,
        JOIN: (id: string) => `/api/v1/community/communities/${id}/join/`,
        LEAVE: (id: string) => `/api/v1/community/communities/${id}/leave/`,
    }
} as const;
