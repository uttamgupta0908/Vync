import { post, localGet } from '@/src/shared/lib/api-client';

import { authService, type User } from '@/src/features/auth/services';
import { UserSchema, PostSchema } from '@/src/shared/contracts/schemas';
import { Post } from '@/src/shared/types';

/**
 * Profile API Services
 * All API calls related to user profiles
 */

// Use User type directly
// export interface UserProfile extends User {
//     coverImage?: string;
// }

// Use Post directly if no additional fields are needed
export type ProfilePost = Post;

/**
 * Fetch user profile by username
 */
export const fetchUserProfile = async (username: string): Promise<User> => {
    // Strip leading @ if present (e.g. from /profile/@username)
    const normalizedUsername = username.startsWith('@') ? username.substring(1) : username;

    if (normalizedUsername === 'you') {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
            throw new Error('Not authenticated');
        }
        return currentUser;
    }

    try {
        // Use the centralized user proxy
        const data = await localGet<unknown>(`/api/users/${normalizedUsername}`);
        
        // Handle wrapped response with type guard
        const dataAsRecord = data as Record<string, unknown>;
        const userData = dataAsRecord.user || dataAsRecord.data || data;
        return UserSchema.parse(userData);
    } catch (error: unknown) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};

/**
 * Fetch user's posts
 */
export const fetchUserPosts = async (username: string): Promise<ProfilePost[]> => {
    const normalizedUsername = username.startsWith('@') ? username.substring(1) : username;
    
    // Proxy through feed to get posts for a user
    const response = await localGet<unknown>(`/api/feed/users/${normalizedUsername}/posts`);
    
    // Handle potentially wrapped response with type guard
    const responseAsRecord = response as Record<string, unknown>;
    const postsData = responseAsRecord.results || responseAsRecord.posts || (Array.isArray(response) ? response : []);
    
    // Ensure postsData is an array before mapping
    const postsArray = Array.isArray(postsData) ? postsData : [];
    return postsArray.map((p: unknown) => PostSchema.parse(p));
};

/**
 * Follow a user
 */
export const followUser = async (userId: string): Promise<void> => {
    return post(`/api/users/${userId}/follow`);
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (userId: string): Promise<void> => {
    return post(`/api/users/${userId}/unfollow`);
};
