import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunities, joinCommunity, leaveCommunity, Community } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';

/**
 * Hook to fetch communities
 */
export function useCommunities(category?: string) {
    return useQuery({
        queryKey: [...queryKeys.communities, category],
        queryFn: () => fetchCommunities(category),
        staleTime: 60000, // 1 minute
    });
}

/**
 * Hook to join/leave a community with optimistic updates
 */
export function useToggleJoinCommunity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ communityId, isJoined }: { communityId: string; isJoined: boolean }) => {
            if (isJoined) {
                return leaveCommunity(communityId);
            }
            return joinCommunity(communityId);
        },
        
        onMutate: async ({ communityId, isJoined }) => {
            // This would be more complex if we had multiple queries with different categories
            await queryClient.cancelQueries({ queryKey: queryKeys.communities });

            const previousCommunities = queryClient.getQueryData(queryKeys.communities);

            queryClient.setQueriesData({ queryKey: queryKeys.communities }, (old: any) => {
                if (!old) return old;
                return old.map((community: Community) => {
                    if (community.id === communityId) {
                        return {
                            ...community,
                            isJoined: !isJoined,
                            members: isJoined ? community.members - 1 : community.members + 1,
                        };
                    }
                    return community;
                });
            });

            return { previousCommunities };
        },
        
        onError: (err, variables, context) => {
            if (context?.previousCommunities) {
                queryClient.setQueryData(queryKeys.communities, context.previousCommunities);
            }
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.communities });
        },
    });
}
