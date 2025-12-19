export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline?: boolean;
    status?: string;
}

export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: string; // ISO string or formatted time string like '2:34 PM'
    type: 'text' | 'image';
    imageUrl?: string;
    isRead?: boolean;
}

export interface Conversation {
    id: string;
    user: User;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isActive?: boolean;
    isTyping?: boolean;
}
