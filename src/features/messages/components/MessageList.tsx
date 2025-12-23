"use client";
import React, { useState } from 'react';
import { Search, Edit } from 'lucide-react';
import { Avatar } from '@/src/shared/ui';
import { Conversation } from '../services';

interface MessageListProps {
    conversations: Conversation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function MessageList({ conversations, selectedId, onSelect }: MessageListProps) {
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
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => onSelect(conversation.id)}
                        className={`px-6 py-4 cursor-pointer transition-colors relative group ${selectedId === conversation.id ? 'bg-neutral-400/50' : 'hover:bg-neutral-400'}`}
                    >
                        {selectedId === conversation.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-300 rounded-r-full" />
                        )}
                        <div className="flex gap-4">
                            <div className="relative shrink-0">
                                <Avatar src={conversation.userAvatar} alt={conversation.userName} size="lg" />
                                {conversation.online && (
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[2.5px] border-white rounded-full"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className={`font-bold text-[15px] text-neutral-800`}>{conversation.userName}</h3>
                                    <span className={`text-xs font-medium ${selectedId === conversation.id ? 'text-primary-300' : 'text-neutral-600'}`}>{conversation.timestamp}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p className={`text-sm truncate ${selectedId === conversation.id ? 'text-neutral-600 font-medium' : 'text-neutral-600'}`}>
                                        {conversation.lastMessage}
                                    </p>
                                    {conversation.unreadCount > 0 && (
                                        <span className="w-2 h-2 rounded-full bg-primary-300 shrink-0"></span>
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
