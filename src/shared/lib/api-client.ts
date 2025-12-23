import axios from 'axios';

/**
 * Central API client
 * All backend API calls should go through this client
 */
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
    timeout: 10000,
    withCredentials: true, // For cookies/auth
});

/**
 * Request interceptor
 * Add auth token, headers, etc.
 */
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
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
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token');
                // window.location.href = '/login';
            }
        }
        
        if (error.response?.status === 500) {
            console.error('Server error:', error.response.data);
        }
        
        return Promise.reject(error);
    }
);

/**
 * Helper function for GET requests
 */
export const get = <T>(url: string, params?: Record<string, unknown>) => {
    return apiClient.get<T>(url, { params }).then(res => res.data);
};

/**
 * Helper function for POST requests
 */
export const post = <T>(url: string, data?: unknown) => {
    return apiClient.post<T>(url, data).then(res => res.data);
};

/**
 * Helper function for PUT requests
 */
export const put = <T>(url: string, data?: unknown) => {
    return apiClient.put<T>(url, data).then(res => res.data);
};

/**
 * Helper function for DELETE requests
 */
export const del = <T>(url: string) => {
    return apiClient.delete<T>(url).then(res => res.data);
};
