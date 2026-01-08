
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchWhatsHappening } from '../services';
import { fetchTrendingCommunities } from '../../communities/services';
import { mockTrendingHashtags, mockCommunities } from '@/src/shared/data/__mocks__/data';

// Mock the api-client
const mocks = vi.hoisted(() => {
  return {
    localGet: vi.fn(),
  };
});

vi.mock('@/src/shared/lib/api-client', () => {
    return {
        localGet: mocks.localGet,
        post: vi.fn(),
        del: vi.fn(),
        localPost: vi.fn(),
        localDel: vi.fn(),
    };
});

describe('Guest Mode Trending Fallback', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetchWhatsHappening returns mock data on 401', async () => {
        // Simulate 401 error
        mocks.localGet.mockRejectedValue({
            response: { status: 401 }
        });

        const result = await fetchWhatsHappening();
        expect(result.trending_hashtags).toEqual(mockTrendingHashtags);
    });

    it('fetchTrendingCommunities returns mock data on 401', async () => {
        // Simulate 401 error
        mocks.localGet.mockRejectedValue({
            response: { status: 401 }
        });

        const result = await fetchTrendingCommunities();
        // Check if result contains valid mock communities
        // Note: fetchTrendingCommunities might transform data or return subset, 
        // but based on my code it returns { trending_communities: mockCommunities }
        expect(result.trending_communities).toEqual(mockCommunities);
    });

    it('fetchWhatsHappening throws on other errors', async () => {
        // Simulate 500 error
        mocks.localGet.mockRejectedValue({
            response: { status: 500 },
            message: 'Internal Server Error'
        });

        await expect(fetchWhatsHappening()).rejects.toThrow();
    });
});
