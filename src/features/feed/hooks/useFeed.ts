import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFeed, fetchPostById, likePost, unlikePost, fetchPostComments } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';
import { Post } from '@/src/shared/types';
import { useAuth } from '@/src/features/auth/hooks/useAuth';

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
 * Hook to fetch comments for a specific post
 */
export function useComments(postId: string) {
    return useQuery({
        queryKey: queryKeys.postComments(postId),
        queryFn: () => fetchPostComments(postId),
        enabled: !!postId,
        staleTime: 30000,
    });
}

/**
 * Hook to fetch single post data
 */
export function usePostDetail(id: string) {
    const { user, isLoading: authLoading } = useAuth();
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: queryKeys.post(id),
        queryFn: () => fetchPostById(id),
        enabled: !!id && !authLoading && !!user,
        staleTime: 30000,
        initialData: () => {
            // Optimistically try to get the post from the feed cache
            const feedData = queryClient.getQueryData<Post[]>(queryKeys.feed);
            return feedData?.find((p) => p.id === id);
        },
        initialDataUpdatedAt: () => {
            // Use the timestamp from the feed query to determine freshness
            return queryClient.getQueryState(queryKeys.feed)?.dataUpdatedAt;
        }
    });
}

/**
 * Hook to like/unlike a post with optimistic updates
 */
export function useLikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            postId,
            has_liked,
        }: {
            postId: string;
            has_liked: boolean;
        }) => {
            return has_liked ? unlikePost(postId) : likePost(postId);
        },

        onMutate: async ({ postId, has_liked }) => {
            // Cancel outgoing refetches for both feed and the specific post
            await queryClient.cancelQueries({ queryKey: queryKeys.feed });
            await queryClient.cancelQueries({ queryKey: queryKeys.post(postId) });

            // Snapshot the previous values
            const previousFeed = queryClient.getQueryData<Post[]>(queryKeys.feed);
            const previousPost = queryClient.getQueryData<Post>(queryKeys.post(postId));

            // Optimistically update to the new value in the feed list
            queryClient.setQueryData<Post[]>(queryKeys.feed, (old) => {
                if (!old) return old;
                return old.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            has_liked: !has_liked,
                            likes: has_liked ? post.likes - 1 : post.likes + 1,
                        }
                        : post
                );
            });

            // Optimistically update to the new value in the post detail cache
            queryClient.setQueryData<Post>(queryKeys.post(postId), (old) => {
                if (!old) return old;
                return {
                    ...old,
                    has_liked: !has_liked,
                    likes: has_liked ? old.likes - 1 : old.likes + 1,
                };
            });

            // Return a context object with the snapshotted values
            return { previousFeed, previousPost };
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, variables, context) => {
            if (context?.previousFeed) {
                queryClient.setQueryData(queryKeys.feed, context.previousFeed);
            }
            if (context?.previousPost) {
                queryClient.setQueryData(
                    queryKeys.post(variables.postId),
                    context.previousPost
                );
            }
        },

        // Always refetch after error or success to ensure server state is correct
        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.feed });
            queryClient.invalidateQueries({
                queryKey: queryKeys.post(variables.postId),
            });
        },
    });
}
