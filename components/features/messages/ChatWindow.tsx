"use client";
import React from 'react';
import { Phone, Video, Info, Smile, Paperclip, Send } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Message, User } from '@/types/messages';

// Mock Data
const ACTIVE_USER: User = {
    id: 'u1',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    status: 'Online',
    isOnline: true,
};

const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        senderId: 'u1',
        content: 'Hey Sarah! I saw your comment on my portfolio post. Really appreciate the feedback! 🙏',
        timestamp: '2:34 PM',
        type: 'text',
    },
    {
        id: '2',
        senderId: 'me',
        content: 'No problem! Your work is really impressive. The animations are so smooth!',
        timestamp: '2:35 PM',
        type: 'text',
        isRead: true,
    },
    {
        id: '3',
        senderId: 'u1',
        content: 'Thanks! I spent weeks perfecting those. Framer Motion is amazing for React animations.',
        timestamp: '2:36 PM',
        type: 'text',
    },
    {
        id: '4',
        senderId: 'me',
        content: 'I\'ve been wanting to learn Framer Motion. Any good tutorials you\'d recommend?',
        timestamp: '2:37 PM',
        type: 'text',
        isRead: true,
    },
    {
        id: '5',
        senderId: 'u1',
        content: 'Absolutely! Here\'s a screenshot of my learning resources:',
        timestamp: '2:38 PM',
        type: 'text',
    },
    {
        id: '6',
        senderId: 'u1',
        content: '', // Image message
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', // Placeholder
        timestamp: '2:38 PM',
        type: 'image',
    }
];

const ME_USER: User = {
    id: 'me',
    name: 'Sarah',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', // Sarah avatar
};

export default function ChatWindow() {
    return (
        <div className="flex-1 flex flex-col h-full bg-neutral-100 relative rounded-2xl ">
            {/* Header */}
            <div className="h-[88px] border-b border-neutral-300 flex items-center justify-between px-8 bg-neutral-100/80 backdrop-blur-sm sticky top-0 z-10 rounded-t-2xl">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar src={ACTIVE_USER.avatar} alt={ACTIVE_USER.name} size="md" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 text-lg">{ACTIVE_USER.name}</h2>
                        <p className="text-sm font-medium text-green-500">{ACTIVE_USER.status}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <button className="p-2.5 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors">
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
                {MOCK_MESSAGES.map((msg) => {
                    const isMe = msg.senderId === 'me';
                    return (
                        <div key={msg.id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
                            <Avatar
                                src={isMe ? ME_USER.avatar : ACTIVE_USER.avatar}
                                alt={isMe ? ME_USER.name : ACTIVE_USER.name}
                                size="md"
                                className="mt-1"
                            />

                            <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[65%]`}>
                                {msg.type === 'text' && msg.content && (
                                    <div className={`
                                        px-6 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
                                        ${isMe
                                            ? 'bg-primary-300 text-neutral-100 rounded-tr-sm'
                                            : 'bg-neutral-200 text-neutral-800 rounded-tl-sm border border-transparent'
                                        }
                                    `}>
                                        {msg.content}
                                    </div>
                                )}

                                {msg.type === 'image' && msg.imageUrl && (
                                    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mt-1">
                                        {/* Using a placeholder div to represent the layout seen in screenshot (gray box) if image fails or for loading state, mock shows gray box */}
                                        <div className="w-[300px] h-[200px] bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                                            Image Attachment ({msg.imageUrl})
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-1.5 mt-1.5 px-1">
                                    <span className="text-[11px] font-medium text-gray-400">{msg.timestamp}</span>
                                    {isMe && msg.isRead && (
                                        <>
                                            <span className="text-[11px] text-gray-300">•</span>
                                            <span className="text-[11px] font-medium text-gray-400">Read</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 bg-white sticky bottom-0">
                <div className="flex items-end gap-3 p-2 bg-white border border-neutral-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary-300/20 focus-within:border-primary-300 transition-all">
                    <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors mb-0.5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <textarea
                        className="flex-1 bg-transparent border-none focus:ring-0 p-3 pl-2 text-gray-900 placeholder:text-gray-400 max-h-32 resize-none text-[15px] leading-[1.5]"
                        placeholder="Type a message..."
                        rows={1}
                        style={{ minHeight: '48px', height: '48px' }}
                    />

                    <div className="flex items-center gap-1 mb-1.5 mr-1">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                            <Smile className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-xl transition-colors shadow-sm ml-1 hover:scale-105 active:scale-95 duration-200">
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
