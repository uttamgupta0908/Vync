import React, { useState } from 'react';
import { Mic, Video, Users } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { LiveRoom } from '@/types/live';

const LIVE_ROOMS: LiveRoom[] = [
    {
        id: '1',
        title: 'Tech Talk Tuesday',
        hostName: 'Emily Chen',
        hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        type: 'audio',
        listeners: 24,
        isLive: true,
    },
    {
        id: '2',
        title: 'Design Critique',
        hostName: 'Sarah Wilson',
        hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        type: 'video',
        listeners: 18,
        isLive: true,
    },
    {
        id: '3',
        title: 'Startup Stories',
        hostName: 'David Kim',
        hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        type: 'audio',
        listeners: 32,
        isLive: true,
    },
    {
        id: '4',
        title: 'Game Dev Stream',
        hostName: 'James Wilson',
        hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        type: 'video',
        listeners: 45,
        isLive: true,
    },
    {
        id: '5',
        title: 'Career Chat',
        hostName: 'Lisa Zhang',
        hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        type: 'audio',
        listeners: 15,
        isLive: true,
    },
];

interface LiveRoomListProps {
    rooms?: LiveRoom[];
    activeRoomId?: string;
    onRoomSelect?: (id: string) => void;
}

export default function LiveRoomList({
    rooms = LIVE_ROOMS,
    activeRoomId = '1',
    onRoomSelect
}: LiveRoomListProps) {
    const [filter, setFilter] = useState<'All' | 'Audio' | 'Video'>('All');

    const filteredRooms = rooms.filter(room => {
        if (filter === 'All') return true;
        return room.type === filter.toLowerCase();
    });

    return (
        <div className="w-[300px] flex flex-col border-r border-neutral-300 bg-neutral-100 h-[calc(100vh-88px)] rounded-2xl shadow-sm overflow-hidden sticky top-4">
            <div className="p-5 border-b border-neutral-200">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-neutral-800 tracking-tight">Live Rooms</h2>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-angry-500 bg-angry-100 px-2 py-1 rounded-full uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-angry-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-angry-500"></span>
                        </span>
                        <span>12 live</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 p-1 bg-neutral-300/80 rounded-xl">
                    {['All', 'Audio', 'Video'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${filter === f ? 'bg-neutral-100 text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100/50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredRooms.map((room) => (
                    <div
                        key={room.id}
                        onClick={() => onRoomSelect?.(room.id)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden ${room.id === activeRoomId ? 'bg-neutral-200/60' : 'hover:bg-neutral-400'}`}
                    >
                        {room.id === activeRoomId && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-300 rounded-r-full" />
                        )}
                        <div className="flex items-start gap-3">
                            <div className="relative shrink-0">
                                <Avatar src={room.hostAvatar} alt={room.hostName} size="md" className="ring-2 ring-neutral-100" />
                                <div className="absolute -bottom-1 -right-1 bg-neutral-100 rounded-full p-0.5 shadow-sm z-10">
                                    {room.type === 'audio' ? (
                                        <div className="bg-angry-500 text-neutral-100 p-1 rounded-full">
                                            <Mic className="w-2.5 h-2.5" />
                                        </div>
                                    ) : (
                                        <div className="bg-angry-500 text-neutral-100 p-1 rounded-full">
                                            <Video className="w-2.5 h-2.5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <h3 className={`font-bold text-sm truncate ${room.id === activeRoomId ? 'text-neutral-900' : 'text-neutral-700'}`}>{room.title}</h3>
                                    {room.id === activeRoomId && <div className="w-1.5 h-1.5 rounded-full bg-angry-500 animate-pulse shrink-0" />}
                                </div>
                                <p className="text-xs text-neutral-600 mb-2 truncate">by {room.hostName}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs text-neutral-600 font-medium">
                                        <Users className="w-3 h-3" />
                                        <span>{room.listeners}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide ${room.type === 'audio' ? 'bg-primary-100/10 text-primary-200' : 'bg-accent-300/20 text-accent-500'}`}>
                                        {room.type === 'audio' ? 'Audio' : 'Video'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
