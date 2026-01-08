"use client";
import React from 'react';
import { LiveContainer } from '@/src/features/live';
import AppHeader from '@/src/shared/layout/AppHeader';

export default function LivePage() {
    return (
        <div className="min-h-screen bg-neutral-400 text-neutral-800 w-full">
            <AppHeader />
            <LiveContainer />
        </div>
    );
}
