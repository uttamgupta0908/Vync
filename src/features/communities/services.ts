import { get, post } from '@/src/shared/lib/api-client';

/**
 * Communities API Services
 */

export interface Community {
    id: string;
    name: string;
    description: string;
    members: number;
    image?: string;
    category: string;
    isJoined?: boolean;
}

/**
 * Fetch all communities
 */
export const fetchCommunities = async (category?: string): Promise<Community[]> => {
    // Mock data for now
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = mockCommunities;
            if (category && category !== 'All') {
                filtered = mockCommunities.filter(c => c.category === category);
            }
            resolve(filtered);
        }, 300);
    });
};

/**
 * Join a community
 */
export const joinCommunity = async (communityId: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

/**
 * Leave a community
 */
export const leaveCommunity = async (communityId: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
};

// Mock data
const mockCommunities: Community[] = [
    {
        id: '1',
        name: 'r/WebDev',
        description: 'A community for developers of all levels to discuss and share their web development projects.',
        members: 45200,
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=400&fit=crop',
        category: 'Technology',
        isJoined: false,
    },
    {
        id: '2',
        name: 'r/Design',
        description: 'Everything about graphic design, UI/UX, and creative arts.',
        members: 32800,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
        category: 'Design',
        isJoined: true,
    },
    {
        id: '3',
        name: 'r/Gaming',
        description: 'The place to discuss all things related to video games, consoles, and the gaming industry.',
        members: 128000,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
        category: 'Gaming',
        isJoined: false,
    },
];
