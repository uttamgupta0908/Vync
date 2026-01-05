import { useQuery, useMutation, useQueryClient, useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { fetchFeed, fetchPostById, likePost, unlikePost, fetchPostComments } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';
import { Post, FeedResponse } from '@/src/shared/contracts/schemas'; // Assuming types export here or index
import { useAuth } from '@/src/features/auth/hooks/useAuth';

/**
 * Hook to fetch feed data (infinite)
 */
export function useFeed() {
    return useInfiniteQuery({
        queryKey: queryKeys.feed,
        queryFn: fetchFeed,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
             // Hard stop if we received fewer items than the limit (20), meaning no more full pages
            if (!lastPage.results || lastPage.results.length < 20) {
                return undefined;
            }
            // Trust frontend calculation over backend response to prevent loops
            // Uses current page number * limit (20)
            return allPages.length * 20;
        },
        staleTime: 30000,
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
            const feedData = queryClient.getQueryData<InfiniteData<FeedResponse>>(queryKeys.feed);
            const allPosts = feedData?.pages.flatMap(page => page.results) || [];
            return allPosts.find((p) => p.id === id);
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
            const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(queryKeys.feed);
            const previousPost = queryClient.getQueryData<Post>(queryKeys.post(postId));

            // Optimistically update to the new value in the feed list
            queryClient.setQueryData<InfiniteData<FeedResponse>>(queryKeys.feed, (old) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        results: page.results.map((post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    has_liked: !has_liked,
                                    likes: has_liked ? post.likes - 1 : post.likes + 1,
                                }
                                : post
                        ),
                    })),
                };
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
