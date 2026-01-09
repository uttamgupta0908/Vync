import { localGet, localPost } from '@/src/shared/lib/api-client';
import { 
    LoginResponseSchema, 
    CurrentUserResponseSchema,
    type LoginResponse,
    type User 
} from '@/src/shared/contracts/schemas';

export type { User };

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    full_name: string;
    username: string;
}

export const authService = {
    /**
     * Login with email and password
     * Sets HttpOnly cookie on server
     */
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await localPost('/api/auth/login', credentials);
        // Validate response shape with Zod
        return LoginResponseSchema.parse(response);
    },

    /**
     * Register new user
     */
    register: async (credentials: RegisterCredentials): Promise<unknown> => {
        return localPost('/api/auth/register', credentials);
    },
    
    /**
     * Logout - clears HttpOnly cookie
     */
    logout: async (): Promise<void> => {
        await localPost('/api/auth/logout');
    },
    
    /**
     * Get current user from server
     * Validated via HttpOnly cookie
     */
    getCurrentUser: async (): Promise<User | null> => {
        const response = await localGet('/api/auth/me');
        // Validate response shape with Zod
        const validated = CurrentUserResponseSchema.parse(response);
        return validated.user;
    },
    
    /**
     * Refresh access token using refresh token cookie
     */
    refreshAccessToken: async (): Promise<string> => {
        const response = await localPost<{ accessToken: string }>('/api/auth/refresh');
        return response.accessToken;
    },
};
