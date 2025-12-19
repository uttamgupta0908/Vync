"use client";
import React, { useState } from 'react';
import { Search, Edit } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Conversation } from '@/types/messages';

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: '1',
        user: { id: 'u1', name: 'Alex Rodriguez', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', isOnline: true },
        lastMessage: 'T hanks for the feedback on my portfolio!',
        lastMessageTime: '2m',
        unreadCount: 1,
        isActive: true,
    },
    {
        id: '2',
        user: { id: 'u2', name: 'Maya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', isOnline: true },
        lastMessage: 'Love the color palette you shared!',
        lastMessageTime: '1h',
        unreadCount: 0,
        isActive: false,
    },
    {
        id: '3',
        user: { id: 'u3', name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150', isOnline: false },
        lastMessage: 'Can\'t wait to try your new game!',
        lastMessageTime: '3h',
        unreadCount: 1,
        isActive: false,
    },
    {
        id: '4',
        user: { id: 'u4', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', isOnline: true },
        lastMessage: 'Hey! How\'s the project going?',
        lastMessageTime: '1d',
        unreadCount: 0,
        isActive: false,
    },
    {
        id: '5',
        user: { id: 'u5', name: 'Lisa Zhang', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', isOnline: false },
        lastMessage: 'Thanks for the design tips!',
        lastMessageTime: '2d',
        unreadCount: 0,
        isActive: false,
    },
    {
        id: '6',
        user: { id: 'u6', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', isOnline: false },
        lastMessage: 'Welcome to Vync! 👋',
        lastMessageTime: '1w',
        unreadCount: 0,
        isActive: false,
    },
];

export default function MessageList() {
    const [activeId, setActiveId] = useState('1');

    return (
        <div className="w-[380px] flex flex-col bg-neutral-100 border-r border-neutral-300 h-full rounded-2xl">
            {/* Header */}
            <div className="p-6 pb-2 ">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Messages</h2>
                    <button className="p-2 text-primary-300 hover:bg-neutral-200 rounded-xl transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                </div>

                <div className="relative mb-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-neutral-400 border-none rounded-2xl py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-600 focus:ring-2 focus:ring-primary-300/20 transition-all"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {MOCK_CONVERSATIONS.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => setActiveId(conversation.id)}
                        className={`px-6 py-4 cursor-pointer transition-colors relative group ${activeId === conversation.id ? 'bg-neutral-400/50' : 'hover:bg-neutral-400'}`}
                    >
                        {/* Selected Indicator - removed vertical line to match mock more closely if needed, or keeping it subtle */}
                        {activeId === conversation.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-300 rounded-r-full" />
                        )}
                        <div className="flex gap-4">
                            <div className="relative shrink-0">
                                <Avatar src={conversation.user.avatar} alt={conversation.user.name} size="lg" />
                                {conversation.user.isOnline && (
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[2.5px] border-white rounded-full"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className={`font-bold text-[15px] ${activeId === conversation.id ? 'text-neutral-800' : 'text-neutral-800'}`}>{conversation.user.name}</h3>
                                    <span className={`text-xs font-medium ${activeId === conversation.id ? 'text-primary-300' : 'text-neutral-600'}`}>{conversation.lastMessageTime}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p className={`text-sm truncate ${activeId === conversation.id ? 'text-neutral-600 font-medium' : 'text-neutral-600'}`}>
                                        {conversation.lastMessage}
                                    </p>
                                    {conversation.unreadCount > 0 && (
                                        <span className="w-2 h-2 rounded-full bg-primary-300 shrink-0"></span> // Small dot style from mock
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
