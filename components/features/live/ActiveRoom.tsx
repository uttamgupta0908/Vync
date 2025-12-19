"use client";
import React from 'react';
import { Mic, Share, MoreVertical, Hand, MessageSquare, Volume2, LogOut, Users } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import IconButton from '@/components/ui/IconButton';
import { Speaker, Audience } from '@/types/live';

const MOCK_SPEAKERS: Speaker[] = [
    {
        id: '1',
        name: 'Emily Chen',
        handle: '@emilyc',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        isHost: true,
        isSpeaking: true,
    },
    {
        id: '2',
        name: 'Alex Rodriguez',
        handle: '@alexr',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
        isSpeaking: false,
    },
    {
        id: '3',
        name: 'Maya Patel',
        handle: '@mayap',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', // Reusing placeholder
        isSpeaking: false,
    },
];

const MOCK_AUDIENCE: Audience[] = [
    { id: '1', name: 'You', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150' },
    { id: '2', name: 'David K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { id: '3', name: 'Lisa Z.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { id: '4', name: 'James W.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: '5', name: 'Mike J.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
    { id: '6', name: 'Sarah W.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
];

interface ActiveRoomProps {
    speakers?: Speaker[];
    audience?: Audience[];
    title?: string;
}

export default function ActiveRoom({
    speakers = MOCK_SPEAKERS,
    audience = MOCK_AUDIENCE,
    title = 'Tech Talk Tuesday'
}: ActiveRoomProps) {

    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-88px)] bg-neutral-100 rounded-2xl shadow-sm border border-neutral-300 p-8 relative overflow-hidden">
            {/* Room Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex gap-5">
                    <div className="relative">
                        <Avatar src={speakers[0].avatar} alt={speakers[0].name} size="lg" className="ring-4 ring-neutral-400" />
                        <div className="absolute -bottom-1 -right-1 bg-angry-500 text-neutral-100 p-1 rounded-full border-[3px] border-neutral-100">
                            <Mic className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-800 mb-1">{title}</h1>
                        <p className="text-neutral-600 text-sm mb-3">Hosted by <span className="font-semibold text-neutral-700">{speakers[0].name}</span></p>
                        <div className="flex items-center gap-4 text-xs font-medium text-neutral-600">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-success-100/50 text-success-500 rounded-full">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                                </span>
                                Live
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                24 listening
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-400 rounded-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                                <span className="font-bold text-neutral-700">45</span> min
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-neutral-400 hover:bg-neutral-300 text-neutral-700 rounded-xl font-bold text-sm transition-colors border border-neutral-300">
                        <Share className="w-4 h-4" />
                        Share
                    </button>
                    <button className="p-2 hover:bg-neutral-300 text-neutral-600 rounded-xl transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-neutral-600 mb-12 leading-relaxed max-w-2xl text-[15px]">
                Join us for our weekly tech discussion! Today we&apos;re talking about the latest in web development, AI trends, and startup insights. Feel free to request to speak!
            </p>

            {/* Speakers Section */}
            <div className="mb-12">
                <h3 className="font-bold text-neutral-800 mb-6 text-sm uppercase tracking-wide">Speakers</h3>
                <div className="flex gap-10">
                    {speakers.map((speaker) => (
                        <div key={speaker.id} className="flex flex-col items-center group cursor-pointer">
                            <div className="relative mb-3">
                                <div className={`p-[3px] rounded-full transition-all duration-300 ${speaker.isSpeaking ? 'bg-gradient-to-tr from-success-400 to-success-500 shadow-md shadow-success-100' : 'bg-transparent'}`}>
                                    <div className="bg-neutral-100 p-0.5 rounded-full">
                                        <Avatar src={speaker.avatar} alt={speaker.name} size="xl" />
                                    </div>
                                </div>
                                {speaker.isHost && (
                                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-primary-300 text-neutral-100 text-[9px] font-bold rounded-md uppercase tracking-wide border-2 border-neutral-100 shadow-sm">
                                        Host
                                    </span>
                                )}
                                <span className={`absolute top-1 right-2 w-3.5 h-3.5 rounded-full border-[2.5px] border-neutral-100 ${speaker.isSpeaking ? 'bg-success-500' : 'bg-neutral-300'}`} />
                            </div>
                            <p className="font-bold text-neutral-800 text-sm group-hover:text-primary-300 transition-colors">{speaker.name}</p>
                            <p className="text-xs text-neutral-600 font-medium">{speaker.handle}</p>
                        </div>
                    ))}

                    {/* Placeholder for Request to Speak */}
                    <div className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all cursor-pointer group hover:-translate-y-1 duration-300">
                        <div className="w-[84px] h-[84px] rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center mb-3 group-hover:border-primary-300 group-hover:bg-neutral-200 group-hover:text-primary-300 text-neutral-500 transition-all">
                            <PlusIcon className="w-8 h-8" />
                        </div>
                        <p className="text-xs font-semibold text-neutral-600 group-hover:text-primary-300">Request to speak</p>
                    </div>
                </div>
            </div>

            <hr className="border-neutral-300 mb-8" />

            {/* Audience Section */}
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-neutral-100/95 backdrop-blur-sm py-2 z-10">
                    <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Audience <span className="text-neutral-600 ml-1">(21)</span></h3>
                    <button className="text-xs text-primary-300 font-bold hover:underline bg-neutral-200 px-3 py-1.5 rounded-lg hover:bg-primary-100/10 transition-colors">View all</button>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-8">
                    {audience.map((person) => (
                        <div key={person.id} className="flex flex-col items-center w-16 group cursor-pointer">
                            <Avatar src={person.avatar} alt={person.name} size="md" className="mb-2 group-hover:ring-4 ring-neutral-200 transition-all" />
                            <p className="text-xs font-medium text-neutral-600 group-hover:text-neutral-800">{person.name}</p>
                        </div>
                    ))}
                    <div className="flex flex-col items-center justify-center w-16 cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-neutral-400 flex items-center justify-center text-xs font-bold text-neutral-600 mb-2 group-hover:bg-neutral-300 group-hover:text-neutral-700 transition-colors border border-neutral-300">
                            +15
                        </div>
                        <p className="text-xs font-medium text-neutral-600">more</p>
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-neutral-100 border-t border-neutral-300 p-5 px-8 flex items-center justify-between z-20">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2.5 px-6 py-3 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-2xl font-bold transition-all shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] hover:-translate-y-0.5 active:translate-y-0">
                        <Hand className="w-5 h-5" />
                        Request to speak
                    </button>
                    <button className="p-3.5 hover:bg-neutral-400 text-neutral-600 hover:text-neutral-800 rounded-2xl transition-all border border-transparent hover:border-neutral-300">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-3.5 hover:bg-neutral-400 text-neutral-600 hover:text-neutral-800 rounded-2xl transition-all border border-transparent hover:border-neutral-300">
                        <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-angry-100 hover:bg-angry-100/80 text-angry-500 hover:text-angry-500/80 rounded-2xl font-bold transition-all border border-angry-100 hover:border-angry-100">
                        <LogOut className="w-5 h-5" />
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}
