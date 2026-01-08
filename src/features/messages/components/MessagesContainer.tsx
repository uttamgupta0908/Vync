'use client';

import React, { useState } from 'react';
import { useConversations, useMessages } from '../hooks/useMessages';
import MessageList from './MessageList';
import ChatWindow from './ChatWindow';
import { MessageSkeleton } from '@/src/shared/ui/LoadingSkeleton';
import ErrorState from '@/src/shared/ui/ErrorState';

/**
 * Messages Container (Smart Component)
 * Handles state for the active conversation and data fetching for messages
 */
export default function MessagesContainer() {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>('1');
    const {
        data: conversations,
        isLoading: conversationsLoading,
        error: conversationsError
    } = useConversations();

    const {
        data: messages,
        isLoading: messagesLoading,
        error: messagesError
    } = useMessages(selectedConversationId);

    if (conversationsLoading) {
        return (
            <div className="flex flex-1 overflow-hidden p-6 sm:p-8 gap-6 w-full max-w-[1600px] mx-auto">
                <div className="w-1/3">
                    <MessageSkeleton />
                </div>
                <div className="flex-1 bg-neutral-100 rounded-3xl animate-pulse" />
            </div>
        );
    }

    if (conversationsError) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <ErrorState message="Failed to load conversations." />
            </div>
        );
    }

    return (
        <div className="flex flex-1 overflow-hidden p-6 sm:p-8 gap-6 w-full max-w-[1600px] mx-auto">
            <MessageList
                conversations={conversations || []}
                selectedId={selectedConversationId}
                onSelect={setSelectedConversationId}
            />
            <ChatWindow
                conversationId={selectedConversationId}
                messages={messages || []}
                isLoading={messagesLoading}
            />
        </div>
    );
}
