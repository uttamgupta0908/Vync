import { Mic, Share, MoreVertical, Hand, MessageSquare, Volume2, LogOut, Users, Plus as PlusIcon } from 'lucide-react';
import { Avatar, Spinner } from '@/src/shared/ui';
import { LiveRoomDetail } from '../services';

interface ActiveRoomProps {
    room?: LiveRoomDetail;
    isLoading: boolean;
}

export default function ActiveRoom({
    room,
    isLoading
}: ActiveRoomProps) {

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-neutral-100 rounded-2xl shadow-sm border border-neutral-300">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!room) {
        return (
            <div className="flex-1 flex items-center justify-center bg-neutral-100 rounded-2xl shadow-sm border border-neutral-300">
                <p className="text-neutral-600">Select a room to join the conversation</p>
            </div>
        );
    }

    const { speakers, audience, title, hostName } = room;

    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-88px)] bg-neutral-100 rounded-2xl shadow-sm border border-neutral-300 p-8 relative overflow-hidden">
            {/* Room Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex gap-5">
                    <div className="relative">
                        <Avatar src={room.hostAvatar} alt={room.hostName} size="lg" className="ring-4 ring-neutral-400" />
                        <div className="absolute -bottom-1 -right-1 bg-angry-500 text-neutral-100 p-1 rounded-full border-[3px] border-neutral-100">
                            <Mic className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-800 mb-1">{title}</h1>
                        <p className="text-neutral-600 text-sm mb-3">Hosted by <span className="font-semibold text-neutral-700">{hostName}</span></p>
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
                                {room.listeners} listening
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
                {room.description || 'Welcome to the room! Join the conversation and share your thoughts.'}
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
                    <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Audience <span className="text-neutral-600 ml-1">({audience.length})</span></h3>
                    <button className="text-xs text-primary-300 font-bold hover:underline bg-neutral-200 px-3 py-1.5 rounded-lg hover:bg-primary-100/10 transition-colors">View all</button>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-8">
                    {audience.map((person) => (
                        <div key={person.id} className="flex flex-col items-center w-16 group cursor-pointer">
                            <Avatar src={person.avatar} alt={person.name} size="md" className="mb-2 group-hover:ring-4 ring-neutral-200 transition-all" />
                            <p className="text-xs font-medium text-neutral-600 group-hover:text-neutral-800">{person.name}</p>
                        </div>
                    ))}
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
