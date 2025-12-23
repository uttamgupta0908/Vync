import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFeed, likePost, unlikePost } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';
import { Post } from '@/src/shared/types';

/**
 * Hook to fetch feed data
 */
export function useFeed() {
    return useQuery({
        queryKey: queryKeys.feed,
        queryFn: fetchFeed,
        staleTime: 30000, // 30 seconds
    });
}

/**
 * Hook to like/unlike a post with optimistic updates
 */
export function useLikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
            if (isLiked) {
                return unlikePost(postId);
            }
            return likePost(postId);
        },
        
        // Optimistic update: Update UI immediately before API call
        onMutate: async ({ postId, isLiked }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: queryKeys.feed });

            // Snapshot the previous value
            const previousFeed = queryClient.getQueryData<Post[]>(queryKeys.feed);

            // Optimistically update to the new value
            queryClient.setQueryData<Post[]>(queryKeys.feed, (old) => {
                if (!old) return old;
                return old.map((post) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            isLiked: !isLiked,
                            likes: isLiked ? post.likes - 1 : post.likes + 1,
                        };
                    }
                    return post;
                });
            });

            // Return a context object with the snapshotted value
            return { previousFeed };
        },
        
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            if (context?.previousFeed) {
                queryClient.setQueryData(queryKeys.feed, context.previousFeed);
            }
        },
        
        // Always refetch after error or success to ensure server state is correct
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.feed });
        },
    });
}
