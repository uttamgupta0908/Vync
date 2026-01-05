import { CommunitySchema, type Community } from '@/src/shared/contracts/schemas';
export { CommunitySchema, type Community };
import { z } from 'zod';



/**
 * Fetch all communities
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
