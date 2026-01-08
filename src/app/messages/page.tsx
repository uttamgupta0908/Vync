"use client";
import React from 'react';
import { MessagesContainer } from '@/src/features/messages';
import AppHeader from '@/src/shared/layout/AppHeader';

export default function MessagesPage() {
    return (
        <div className="min-h-screen bg-neutral-400 text-neutral-800 w-full">
            <AppHeader />
            <MessagesContainer />
        </div>
    );
}
