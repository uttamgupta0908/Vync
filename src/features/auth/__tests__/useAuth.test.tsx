import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

// Mock auth service and toast
vi.mock('../services', () => ({
    authService: {
        getCurrentUser: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
    },
}));

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

describe('useAuth', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
            },
        });
        vi.clearAllMocks();
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('returns user data when authenticated', async () => {
        const mockUser = { id: '1', username: 'testuser', email: 'test@vync.live' };
        (authService.getCurrentUser as ReturnType<typeof vi.fn>).mockResolvedValue(mockUser);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('handles login success', async () => {
        const mockUser = { id: '1', username: 'testuser' };
        const credentials = { email: 'test@vync.live', password: 'password' };

        (authService.login as ReturnType<typeof vi.fn>).mockResolvedValue({ user: mockUser });

        const { result } = renderHook(() => useAuth(), { wrapper });

        await result.current.loginAsync(credentials);

        expect(authService.login).toHaveBeenCalledWith(credentials);
        expect(toast.success).toHaveBeenCalled();
        await waitFor(() => expect(result.current.user).toEqual(mockUser));
    });

    it('handles logout', async () => {
        (authService.logout as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });

        const { result } = renderHook(() => useAuth(), { wrapper });

        await result.current.logout();

        expect(authService.logout).toHaveBeenCalled();
        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });
});
