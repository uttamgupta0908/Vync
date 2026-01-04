import { QueryClient } from '@tanstack/react-query';

/**
 * React Query Client Configuration
 * Global settings for all queries and mutations
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // How long data stays fresh before refetch (30 seconds)
            staleTime: 30000,
            
            // How long inactive data stays in cache (5 minutes)
            gcTime: 5 * 60 * 1000,
            
            // Retry failed requests
            retry: 2,
            
            // Retry delay (exponential backoff)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            
            // Refetch on window focus (good for social apps)
            refetchOnWindowFocus: true,
            
            // Don't refetch on mount if data is fresh
            refetchOnMount: false,
        },
        mutations: {
            // Retry mutations once
            retry: 1,
        },
    },
});

/**
 * Query Keys Factory
 * Centralized query keys for type safety and consistency
 */
export const queryKeys = {
    // Feed
    feed: ['feed'] as const,
    post: (id: string) => ['post', id] as const,
    postComments: (id: string) => ['post', id, 'comments'] as const,
    
    // Profile
    userProfile: (username: string) => ['user', username] as const,
    userPosts: (username: string) => ['user', username, 'posts'] as const,
    
    // Communities
    communities: ['communities'] as const,
    community: (id: string) => ['community', id] as const,
    
    // Messages
    conversations: ['conversations'] as const,
    messages: (conversationId: string) => ['messages', conversationId] as const,
    
    // Live
    liveRooms: ['liveRooms'] as const,
    liveRoom: (id: string) => ['liveRoom', id] as const,
} as const;
