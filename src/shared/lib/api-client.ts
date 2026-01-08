import axios from 'axios';
import { VYNC_API } from './constants';

/**
 * Central API client
 * All backend API calls should go through this client
 */
export const apiClient = axios.create({
    // Real Vync API (proxied to avoid CORS on client, direct on server)
    baseURL: typeof window === 'undefined' 
        ? VYNC_API.BASE 
        : (process.env.NEXT_PUBLIC_API_URL || '/api/proxy'),
    timeout: 10000,
    withCredentials: true, // For cookies/auth
});

/**
 * Local API client for Next.js API routes
 * Used for auth and other local endpoints
 */
export const localApiClient = axios.create({
    baseURL: '', // Same origin (Next.js API routes)
    timeout: 10000,
    withCredentials: true,
});

/**
 * Request interceptor
 * Can add custom headers, logging, etc.
 */
apiClient.interceptors.request.use(
    async (config) => {
        // Server-side cookie forwarding: Forward cookies from the incoming browser request
        // to the outgoing Vync API request to maintain authentication session.
        if (typeof window === 'undefined') {
            try {
                const { cookies } = await import('next/headers');
                const cookieStore = await cookies();
                const cookieString = cookieStore.toString();
                if (cookieString) {
                    config.headers.Cookie = cookieString;
                }
            } catch (e) {
                // Handle cases where headers() is called outside of a request context
                // (e.g., during static builds or background tasks)
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Apply same interceptor to local client
localApiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * Handle errors globally
 */
const responseInterceptor = async (error: any) => {
    const originalRequest = error.config;

    // Handle common errors
    if (error.response?.status === 401 && !originalRequest._retry) {
        // Unauthorized - cookie expired or invalid
        // Attempt to refresh if it's the main API and not already retrying
        if (originalRequest.url && !originalRequest.url.includes('/api/auth/')) {
            originalRequest._retry = true;
            try {
                // Call local refresh endpoint
                const data = await localPost<{ accessToken: string }>('/api/auth/refresh');
                
                // Retry the original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Just warn, don't error - common for guests
                console.warn('Session refresh attempt failed (expected for guests):', refreshError);
            }
        }
        console.warn('Unauthorized request - session may have expired');
    }
    
    if (error.response?.status === 500) {
        console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
};

apiClient.interceptors.response.use((response) => response, responseInterceptor);
localApiClient.interceptors.response.use((response) => response, responseInterceptor);

/**
 * Helper function for GET requests (Vync API)
 */
export const get = <T>(url: string, params?: Record<string, unknown>) => {
    return apiClient.get<T>(url, { params }).then(res => res.data);
};

/**
 * Helper function for POST requests (Vync API)
 */
export const post = <T>(url: string, data?: unknown) => {
    return apiClient.post<T>(url, data).then(res => res.data);
};

/**
 * Helper function for PUT requests (Vync API)
 */
export const put = <T>(url: string, data?: unknown) => {
    return apiClient.put<T>(url, data).then(res => res.data);
};

/**
 * Helper function for DELETE requests (Vync API)
 */
export const del = <T>(url: string) => {
    return apiClient.delete<T>(url).then(res => res.data);
};

/**
 * Local API helpers (Next.js API routes)
 */
export const localGet = <T>(url: string, params?: Record<string, unknown>) => {
    return localApiClient.get<T>(url, { params }).then(res => res.data);
};

export const localPost = <T>(url: string, data?: unknown) => {
    return localApiClient.post<T>(url, data).then(res => res.data);
};

export const localDel = <T>(url: string) => {
    return localApiClient.delete<T>(url).then(res => res.data);
};
