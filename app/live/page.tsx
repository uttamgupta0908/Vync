"use client";
import React from 'react';
import LiveRoomList from '@/components/features/live/LiveRoomList';
import ActiveRoom from '@/components/features/live/ActiveRoom';
import HomeHeader from '@/components/layout/HomeHeader';

export default function LivePage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-neutral-400">

            <div className="flex overflow-hidden p-6 sm:p-8 gap-6 w-full mx-0 ">
                <LiveRoomList />
                <ActiveRoom />
            </div>
        </div>
    );
}
