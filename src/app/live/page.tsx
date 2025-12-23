"use client";
import React from 'react';
import { LiveContainer } from '@/src/features/live';

export default function LivePage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-neutral-400">
            <LiveContainer />
        </div>
    );
}
