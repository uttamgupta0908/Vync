"use client";
import React from 'react';
import { MessagesContainer } from '@/src/features/messages';

export default function MessagesPage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-neutral-400 ">
            <MessagesContainer />
        </div>
    );
}
