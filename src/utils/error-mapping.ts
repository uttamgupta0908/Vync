import { ApiError } from '@/src/shared/contracts/schemas';
import axios from 'axios';


export const ERROR_MESSAGES = {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Connection error. Please check your internet.',
    UNAUTHORIZED: 'Session expired. Please login again.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION: 'Please check your input and try again.',
    SERVER: 'Server is currently unavailable. We are working on it.',
} as const;

/**
 * Maps API/Network errors to user-friendly messages and codes
 */
export function mapError(error: unknown): { message: string; code: string; originalError: unknown } {
    let message: string = ERROR_MESSAGES.GENERIC;
    let code = 'UNKNOWN_ERROR';
    
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data as ApiError | undefined;
        
        if (data?.error) {
            message = data.error;
        }
        
        switch (status) {
            case 400:
                code = 'VALIDATION_ERROR';
                message = message || ERROR_MESSAGES.VALIDATION;
                break;
            case 401:
                code = 'UNAUTHORIZED';
                message = ERROR_MESSAGES.UNAUTHORIZED;
                break;
            case 403:
                code = 'FORBIDDEN';
                message = 'You do not have permission to perform this action.';
                break;
            case 404:
                code = 'NOT_FOUND';
                message = ERROR_MESSAGES.NOT_FOUND;
                break;
            case 429:
                code = 'RATE_LIMIT';
                message = 'Too many requests. Please slow down.';
                break;
            case 500:
            case 502:
            case 503:
            case 504:
                code = 'SERVER_ERROR';
                message = ERROR_MESSAGES.SERVER;
                break;
            default:
                if (!error.response) {
                    code = 'NETWORK_ERROR';
                    message = ERROR_MESSAGES.NETWORK;
                }
        }
    } else if (error instanceof Error) {
        message = error.message;
        code = 'JS_ERROR';
    }

    return { message, code, originalError: error };
}
