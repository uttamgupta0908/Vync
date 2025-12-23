import { get, post, del } from '@/src/shared/lib/api-client';
import { Post, User } from '@/src/shared/types';
import { posts } from '@/src/shared/data/mock';

/**
 * Feed API Services
 * All API calls related to the feed feature
 */

export interface FeedResponse {
    posts: Post[];
    nextCursor?: string;
}

/**
 * Fetch feed posts
 */
export const fetchFeed = async (): Promise<Post[]> => {
    // TODO: Replace with actual API endpoint
    // return get<FeedResponse>('/feed').then(res => res.posts);
    
    // Mock data for now
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(posts);
        }, 500);
    });
};

/**
 * Like a post
 */
export const likePost = async (postId: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    // return post(`/posts/${postId}/like`);
    
    // Mock implementation
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

/**
 * Unlike a post
 */
export const unlikePost = async (postId: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    // return del(`/posts/${postId}/like`);
    
    // Mock implementation
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

