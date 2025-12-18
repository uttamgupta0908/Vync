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

// Combined data for a detailed active room view
export interface LiveRoomDetail extends LiveRoom {
    speakers: Speaker[];
    audience: Audience[];
    durationExisted: number; // minutes
}
