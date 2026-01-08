import { Conversation, Message, Community } from '@/src/shared/contracts/schemas';

import { LiveRoom, Speaker, Audience } from '@/src/features/live/services';

export const mockConversations: Conversation[] = [
    {
        id: '1',
        userName: 'Alex Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        lastMessage: 'Let me know when you have time for the review.',
        timestamp: '10:45 AM',
        unreadCount: 2,
        online: true,
    },
    {
        id: '2',
        userName: 'Sarah Chen',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        lastMessage: 'The new design looks great!',
        timestamp: 'Yesterday',
        unreadCount: 0,
        online: false,
    },
];

export const mockMessages: Record<string, Message[]> = {
    '1': [
        { id: '101', senderId: '1', text: 'Hey, are you free for a quick call?', timestamp: '10:30 AM', isMe: false },
        { id: '102', senderId: 'me', text: 'Sure, what\'s up?', timestamp: '10:31 AM', isMe: true },
        { id: '103', senderId: '1', text: 'Just wanted to discuss the new feature request.', timestamp: '10:32 AM', isMe: false },
        { id: '104', senderId: '1', text: 'Let me know when you have time for the review.', timestamp: '10:45 AM', isMe: false },
    ],
};

export const mockCommunities: Community[] = [
    {
        id: '1',
        name: 'r/WebDev',
        description: 'A community for developers of all levels to discuss and share their web development projects.',
        members: 45200,
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=400&fit=crop',
        category: 'Technology',
        isJoined: false,
        followers_count: 45000,
    },
    {
        id: '2',
        name: 'r/Design',
        description: 'Everything about graphic design, UI/UX, and creative arts.',
        members: 32800,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
        category: 'Design',
        isJoined: true,
        followers_count: 32000,
    },
    {
        id: '3',
        name: 'r/Gaming',
        description: 'The place to discuss all things related to video games, consoles, and the gaming industry.',
        members: 128000,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
        category: 'Gaming',
        isJoined: false,
        followers_count: 128000,
    },
];

export const mockLiveRooms: LiveRoom[] = [
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

export const mockSpeakers: Speaker[] = [
    { id: '1', name: 'DevMaster', handle: '@devmaster', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', isHost: true, isSpeaking: true },
    { id: '2', name: 'Alex Rodriguez', handle: '@alexr', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', isSpeaking: false },
];

export const mockAudience: Audience[] = [
    { id: 'a1', name: 'User 1', avatar: '' },
    { id: 'a2', name: 'User 2', avatar: '' },
];

export const mockTrendingHashtags = [
    {
        hashtag: "#tech",
        usage_count: 142,
        last_used: "2026-01-05T13:45:00+05:30",
        total_engagement: 450,
        trending_score: 234.4
    },
    {
        hashtag: "#coding",
        usage_count: 98,
        last_used: "2026-01-05T12:30:00+05:30",
        total_engagement: 320,
        trending_score: 164.6
    }
];
