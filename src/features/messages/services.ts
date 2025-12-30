import { get, post } from '@/src/shared/lib/api-client';
import { MessageSchema, ConversationSchema, type Message, type Conversation } from '@/src/shared/lib/schemas';
export { MessageSchema, ConversationSchema, type Message, type Conversation };
import { z } from 'zod';


/**
 * Messages API Services
 */


/**
 * Fetch all conversations
 */
export const fetchConversations = async (): Promise<Conversation[]> => {
    const data = await new Promise<any[]>((resolve) => {
        setTimeout(() => {
            resolve(mockConversations);
        }, 300);
    });

    return z.array(ConversationSchema).parse(data);
};

/**
 * Fetch messages for a conversation
 */
export const fetchMessages = async (conversationId: string): Promise<Message[]> => {
    const data = await new Promise<any[]>((resolve) => {
        setTimeout(() => {
            resolve(mockMessages[conversationId] || []);
        }, 300);
    });

    return z.array(MessageSchema).parse(data);
};

/**
 * Send a message
 */
export const sendMessage = async (conversationId: string, text: string): Promise<Message> => {
    const data = await new Promise<any>((resolve) => {
        setTimeout(() => {
            const newMessage: Message = {
                id: Math.random().toString(36).substr(2, 9),
                senderId: 'me',
                text,
                timestamp: 'Just now',
                isMe: true,
            };
            resolve(newMessage);
        }, 300);
    });

    return MessageSchema.parse(data);
};

// Mock data
const mockConversations: Conversation[] = [
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

const mockMessages: Record<string, Message[]> = {
    '1': [
        { id: '101', senderId: '1', text: 'Hey, are you free for a quick call?', timestamp: '10:30 AM', isMe: false },
        { id: '102', senderId: 'me', text: 'Sure, what\'s up?', timestamp: '10:31 AM', isMe: true },
        { id: '103', senderId: '1', text: 'Just wanted to discuss the new feature request.', timestamp: '10:32 AM', isMe: false },
        { id: '104', senderId: '1', text: 'Let me know when you have time for the review.', timestamp: '10:45 AM', isMe: false },
    ],
};
