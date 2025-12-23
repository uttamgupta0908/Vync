import { get, post } from '@/src/shared/lib/api-client';
import { User, Post } from '@/src/shared/types';

/**
 * Profile API Services
 * All API calls related to user profiles
 */

export interface UserProfile extends User {
    coverImage?: string;
    website?: string;
    joinedDate?: string;
}

export interface ProfilePost extends Post {
    // Additional profile-specific post fields if needed
}

/**
 * Fetch user profile by username
 */
export const fetchUserProfile = async (username: string): Promise<UserProfile> => {
    // TODO: Replace with actual API endpoint
    // return get<UserProfile>(`/users/${username}`);
    
    // Mock data for now
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserProfile);
        }, 300);
    });
};

/**
 * Fetch user's posts
 */
export const fetchUserPosts = async (username: string): Promise<ProfilePost[]> => {
    // TODO: Replace with actual API endpoint
    // return get<ProfilePost[]>(`/users/${username}/posts`);
    
    // Mock data for now
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserPosts);
        }, 400);
    });
};

/**
 * Follow a user
 */
export const followUser = async (userId: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    // return post(`/users/${userId}/follow`);
    
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (userId: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    // return post(`/users/${userId}/unfollow`);
    
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

// Mock data (will be replaced with real API calls)
const mockUserProfile: UserProfile = {
    id: '1',
    name: 'Alex Johnson',
    handle: '@alexj',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Product designer passionate about creating intuitive user experiences. Love exploring new design trends, sharing insights, and connecting with creative minds. Always learning, always creating. 🎨',
    followers: 12400,
    following: 856,
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    verified: true,
    posts: 342,
    rewardPoints: 2450,
};

const mockUserPosts: ProfilePost[] = [
    {
        id: 'p1',
        title: 'New Dashboard Design Concept',
        description: 'Working on a fresh approach to data visualization experience.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        author: {
            id: 'u1',
            name: 'Alex Johnson',
            avatar: mockUserProfile.avatar,
            handle: '@alexj',
            followers: 12400,
            following: 856,
        },
        timestamp: '2 hours ago',
        comments: 4,
        likes: 28,
        content: 'Just finished this new dashboard design concept',
        reposts: 2,
        views: 234,
        isLiked: false,
    },
    {
        id: 'p2',
        title: 'Design Inspiration for the Week',
        description: "Sharing some new color palettes I've been experimenting with lately.",
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        author: {
            id: 'u1',
            name: 'Alex Johnson',
            avatar: mockUserProfile.avatar,
            handle: '@alexj',
            followers: 12400,
            following: 856,
        },
        timestamp: '1 day ago',
        comments: 12,
        likes: 89,
        content: 'Design inspiration for the week',
        reposts: 5,
        views: 567,
        isLiked: false,
    },
    {
        id: 'p3',
        title: 'Mobile App Redesign Project',
        description: 'Exploring new navigation patterns and improving the overall user flow.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        author: {
            id: 'u1',
            name: 'Alex Johnson',
            avatar: mockUserProfile.avatar,
            handle: '@alexj',
            followers: 12400,
            following: 856,
        },
        timestamp: '2 days ago',
        comments: 23,
        likes: 156,
        content: 'Mobile app redesign project',
        reposts: 12,
        views: 1234,
        isLiked: false,
    },
];
