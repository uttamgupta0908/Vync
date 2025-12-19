"use client";
import React from 'react';
import MessageList from '@/components/features/messages/MessageList';
import ChatWindow from '@/components/features/messages/ChatWindow';

export default function MessagesPage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-neutral-400 ">
            <div className="flex flex-1 overflow-hidden p-6 sm:p-8 gap-6 w-full max-w-[1600px] mx-auto">
                <MessageList />
                <ChatWindow />
            </div>
        </div>
    );
}
