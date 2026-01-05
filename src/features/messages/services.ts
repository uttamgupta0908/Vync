import { get, post } from '@/src/shared/lib/api-client';
import { MessageSchema, ConversationSchema, type Message, type Conversation } from '@/src/shared/contracts/schemas';
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

// Mock data imported from centralized mocks
import { mockConversations, mockMessages } from '@/src/shared/data/__mocks__/data';
