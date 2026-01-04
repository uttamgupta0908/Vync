import { get, post, localGet } from '@/src/shared/lib/api-client';

import { authService, type User } from '@/src/features/auth/services';
import { UserSchema, PostSchema } from '@/src/shared/contracts/schemas';
import { Post } from '@/src/shared/types';

/**
 * Profile API Services
 * All API calls related to user profiles
 */

export interface UserProfile extends User {
    coverImage?: string;
}

// Use Post directly if no additional fields are needed
export type ProfilePost = Post;

/**
 * Fetch user profile by username
 */
export const fetchUserProfile = async (username: string): Promise<UserProfile> => {
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
        // Call our local Next.js API route which handles Auth headers and fallbacks
        // This avoids the issue where client-side proxy calls lack the HttpOnly cookie/token
        const data = await localGet<any>(`/api/users/${normalizedUsername}`);
        
        // Handle wrapped response
        const userData = data.user || data.data || data;
        return UserSchema.parse(userData);
    } catch (error: any) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};

/**
 * Fetch user's posts
 */
export const fetchUserPosts = async (username: string): Promise<ProfilePost[]> => {
    const normalizedUsername = username.startsWith('@') ? username.substring(1) : username;
    
    // Call real API
    const response = await get<any>(`/api/v1/users/${normalizedUsername}/posts/`);
    
    // Handle wrapped response logic: { results: [...] } or { posts: [...] } or direct [...]
    const postsData = response?.results || response?.posts || (Array.isArray(response) ? response : []);
    
    // Validate each post in the array
    return postsData.map((p: any) => PostSchema.parse(p));
};

/**
 * Follow a user
 */
export const followUser = async (userId: string): Promise<void> => {
    return post(`/users/${userId}/follow`);
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (userId: string): Promise<void> => {
    return post(`/users/${userId}/unfollow`);
};
