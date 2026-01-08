'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService, type LoginCredentials } from '../services';
import toast from 'react-hot-toast';
import { queryKeys } from '@/src/shared/lib/query-client';

/**
 * Get current user with proper caching
 * - staleTime: 5 minutes (don't refetch for 5 min)
 * - gcTime: 30 minutes (keep in cache for 30 min)
 */
export function useCurrentUser() {
    return useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: authService.getCurrentUser,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
        retry: false,
    });
}

/**
 * Login mutation with optimistic update and toast notifications
 */
export function useLogin() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            // Update user data immediately
            queryClient.setQueryData(queryKeys.currentUser, data.user);
            toast.success('Welcome back!');
            // Force reload to ensure fresh state
            window.location.reload();
        },
        onError: (error: any) => {
            console.error('Login failed:', error);
            toast.error(error?.response?.data?.error || 'Login failed. Please try again.');
        },
    });
}

/**
 * Logout mutation with cache invalidation and toast
 */
export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    
    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            // Clear user data
            queryClient.setQueryData(queryKeys.currentUser, null);
            queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
            toast.success('Logged out successfully');
            // Force reload and redirect to home
            window.location.href = '/';
        },
        onError: (error: any) => {
            toast.error('Logout failed. Please try again.');
        },
    });
}

/**
 * Combined auth hook for easy consumption
 */
export function useAuth() {
    const { data: user, isLoading } = useCurrentUser();
    const login = useLogin();
    const logout = useLogout();
    
    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        login: login.mutate,
        loginAsync: login.mutateAsync,
        logout: logout.mutate,
        isLoggingIn: login.isPending,
        isLoggingOut: logout.isPending,
    };
}
