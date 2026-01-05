import axios from 'axios';
import { VYNC_API } from '@/src/shared/lib/constants';
import { getAccessToken, getRefreshToken, setAuthCookies } from './auth-utils';

/**
 * Server-side Axios instance
 * DO NOT use this on the client side
 */
export const backendClient = axios.create({
    baseURL: VYNC_API.BASE,
    timeout: 10000,
});

// Request Interceptor: Attach Token
backendClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Auto-Refresh
backendClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = await getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Attempt refresh
                // Note: We use a separate axios call to avoid infinite loops if this fails
                const refreshResponse = await axios.post(
                    `${VYNC_API.BASE}${VYNC_API.AUTH.REFRESH}`, 
                    { refresh: refreshToken }
                );

                const { access, refresh } = refreshResponse.data;

                // Update cookies on the server response
                await setAuthCookies(access, refresh);

                // Update header for retry
                originalRequest.headers.Authorization = `Bearer ${access}`;
                
                // Retry original request
                return backendClient(originalRequest);

            } catch (refreshError) {
                console.error('Server-side token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
