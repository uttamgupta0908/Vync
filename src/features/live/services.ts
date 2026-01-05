/**
 * Live Room API Services
 */

export interface LiveRoom {
    id: string;
    title: string;
    hostName: string;
    hostAvatar: string;
    type: 'audio' | 'video';
    listeners: number;
    isLive: boolean; 
    description?: string;
    startTime?: string;
}

export interface Speaker {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    isHost?: boolean;
    isSpeaking?: boolean;
}

export interface Audience {
    id: string;
    name: string;
    avatar: string;
}

export interface LiveRoomDetail extends LiveRoom {
    speakers: Speaker[];
    audience: Audience[];
}

/**
 * Fetch all live rooms
 */
export const fetchLiveRooms = async (): Promise<LiveRoom[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockLiveRooms);
        }, 300);
    });
};

/**
 * Fetch a specific room's details
 */
export const fetchLiveRoom = async (id: string): Promise<LiveRoomDetail | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const room = mockLiveRooms.find(r => r.id === id);
            if (!room) return resolve(undefined);

            resolve({
                ...room,
                speakers: mockSpeakers,
                audience: mockAudience,
            });
        }, 300);
    });
};

// Mock data
// Mock data imported from centralized mocks
import { mockLiveRooms, mockSpeakers, mockAudience } from '@/src/shared/data/__mocks__/data';

