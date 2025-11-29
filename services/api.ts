import { Post } from '@/types';
import { posts as allPosts } from '@/data/mock';

interface FetchPostsResponse {
    data: Post[];
    nextPage: number | null;
    total: number;
}

const DELAY_MS = 800; // Simulate network latency

export const api = {
    posts: {
        list: async (page: number = 1, limit: number = 10): Promise<FetchPostsResponse> => {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

            const start = (page - 1) * limit;
            const end = start + limit;
            const data = allPosts.slice(start, end);
            
            const hasMore = end < allPosts.length;

            return {
                data,
                nextPage: hasMore ? page + 1 : null,
                total: allPosts.length,
            };
        },
    },
};
