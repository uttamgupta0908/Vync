import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, fetchUserPosts, followUser, unfollowUser } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';

/**
 * Hook to fetch user profile data
 */
export function useUserProfile(username: string) {
    return useQuery({
        queryKey: queryKeys.userProfile(username),
        queryFn: () => fetchUserProfile(username),
        staleTime: 60000, // 1 minute (profiles don't change often)
    });
}

/**
 * Hook to fetch user's posts
 */
export function useUserPosts(username: string) {
    return useQuery({
        queryKey: queryKeys.userPosts(username),
        queryFn: () => fetchUserPosts(username),
        staleTime: 30000, // 30 seconds
    });
}

/**
 * Hook to follow/unfollow a user with optimistic updates
 */
export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, username, isFollowing }: { userId: string; username: string; isFollowing: boolean }) => {
            if (isFollowing) {
                return unfollowUser(userId);
            }
            return followUser(userId);
        },
        
        // Optimistic update: Update UI immediately before API call
        onMutate: async ({ username, isFollowing }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.userProfile(username) });

            // Snapshot the previous value
            const previousProfile = queryClient.getQueryData(queryKeys.userProfile(username));

            // Optimistically update to the new value
            queryClient.setQueryData(queryKeys.userProfile(username), (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    followers: isFollowing ? old.followers - 1 : old.followers + 1,
                };
            });

            // Return a context object with the snapshotted value
            return { previousProfile, username };
        },
        
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(
                    queryKeys.userProfile(context.username),
                    context.previousProfile
                );
            }
        },
        
        // Always refetch after error or success
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.userProfile(variables.username) });
        },
    });
}
