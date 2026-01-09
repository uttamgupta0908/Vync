import { CommunitySchema,TrendingCommunitiesResponseSchema, type Community, type TrendingCommunitiesResponse } from '@/src/shared/contracts/schemas';
export { CommunitySchema, type Community };
import { z } from 'zod';
import { localGet } from '@/src/shared/lib/api-client';

/**
 * Fetch trending communities
 * Proxy: /api/community/communities/trending -> Backend: /api/v1/community/communities/trending/
 */
export const fetchTrendingCommunities = async (): Promise<TrendingCommunitiesResponse> => {
    try {
        const response = await localGet<unknown>('/api/community/communities/trending');
        console.log('[Community Service Debug] fetchTrendingCommunities response keys:', Object.keys(response || {}));
        return TrendingCommunitiesResponseSchema.parse(response);
    } catch (error: unknown) {
        // If unauthorized (guest), return empty structure
        // If unauthorized (guest), return mock data instead of empty structure
        if (
            (typeof error === 'object' && error !== null && 'response' in error && 
             (error as { response?: { status?: number } }).response?.status === 401) ||
            (typeof error === 'object' && error !== null && 'status' in error &&
             (error as { status?: number }).status === 401)
        ) {
            console.debug('[Community Service] Guest user - returning mock trending communities');
            // Ensure we return valid TrendingCommunity objects (Community fits if sample_members optional)
            return { trending_communities: mockCommunities };
        }
        console.error('[Community Service Debug] fetchTrendingCommunities FAILED:', error instanceof Error ? error.message : String(error));
        throw error;
    }
};


/**
 * Fetch all communities (Mock fallback for now)
 */
export const fetchCommunities = async (category?: string): Promise<Community[]> => {
    // Mock data for now
    const data = await new Promise<Community[]>((resolve) => {
        setTimeout(() => {
            let filtered = mockCommunities;
            if (category && category !== 'All') {
                filtered = mockCommunities.filter(c => c.category === category);
            }
            resolve(filtered);
        }, 300);
    });

    // Contract Validation
    return z.array(CommunitySchema).parse(data);
};

/**
 * Join a community
 */
export const joinCommunity = async (_communityId: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

/**
 * Leave a community
 */
export const leaveCommunity = async (_communityId: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

// Mock data
// Mock data imported from centralized mocks
import { mockCommunities } from '@/src/shared/data/__mocks__/data';
