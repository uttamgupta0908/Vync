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
const mockLiveRooms: LiveRoom[] = [
    {
        id: '1',
        title: 'Building a Vync clone from scratch!',
        hostName: 'DevMaster',
        hostAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
        type: 'video',
        listeners: 1250,
        isLive: true,
    },
    {
        id: '2',
        title: 'Late night lo-fi beats and chill',
        hostName: 'LoFiGirl',
        hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        type: 'audio',
        listeners: 8900,
        isLive: true,
    },
];

const mockSpeakers: Speaker[] = [
    { id: '1', name: 'DevMaster', handle: '@devmaster', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', isHost: true, isSpeaking: true },
    { id: '2', name: 'Alex Rodriguez', handle: '@alexr', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', isSpeaking: false },
];

const mockAudience: Audience[] = [
    { id: 'a1', name: 'User 1', avatar: '' },
    { id: 'a2', name: 'User 2', avatar: '' },
];

