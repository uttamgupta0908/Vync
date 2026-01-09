'use client';

import { useState } from 'react';
import { useLiveRooms, useLiveRoom } from '../hooks/useLive';
import LiveRoomList from './LiveRoomList';
import ActiveRoom from './ActiveRoom';
import ErrorState from '@/src/shared/ui/ErrorState';

/**
 * Live Container (Smart Component)
 * Handles state for active live room and data fetching
 */
export default function LiveContainer() {
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>('1');
    const {
        data: rooms,
        isLoading: roomsLoading,
        error: roomsError
    } = useLiveRooms();

    const {
        data: activeRoom,
        isLoading: roomLoading
    } = useLiveRoom(selectedRoomId);

    if (roomsError) {
        return <ErrorState message="Failed to load live rooms." />;
    }

    return (
        <div className="flex overflow-hidden p-6 sm:p-8 gap-6 w-full mx-0">
            <LiveRoomList
                rooms={rooms || []}
                selectedId={selectedRoomId}
                onSelect={setSelectedRoomId}
                isLoading={roomsLoading}
            />
            <ActiveRoom
                room={activeRoom}
                isLoading={roomLoading}
            />
        </div>
    );
}
