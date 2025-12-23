'use client';

import { User } from '@/src/shared/types';
import Avatar from '@/src/shared/ui/Avatar';
import { MessageCircle, MoreHorizontal, MapPin, Calendar } from 'lucide-react';

interface UserProfileHeaderProps {
    user: User;
}

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
    const tags = ['Design', 'UX', 'CreativeLife', 'TechEnthusiast'];

    return (
        <div className="bg-neutral-400  overflow-hidden ">
            {/* Cover Gradient */}
            <div className="h-64 bg-gradient-to-br from-primary-200 via-primary-300 to-accent-100 relative">
                {/* Decorative blobs */}
                <div className="absolute top-12 left-12 w-48 h-48 bg-primary-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-12 right-12 w-64 h-64 bg-accent-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8 -mt-20">
                <div className="flex justify-between items-end mb-6">
                    <div className="relative">
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            size="2xl"
                            variant="rounded"
                            className="ring-[8px] ring-neutral-100 shadow-xl"
                        />
                        {/* Online Indicator */}
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-success-500 rounded-full ring-4 ring-neutral-100 shadow-sm"></div>
                    </div>

                    <div className="flex gap-3 -mb-2 ">
                        <button className="px-8 py-2.5 bg-primary-200 hover:bg-primary-300 text-neutral-100 rounded-xl font-bold transition-all shadow-lg shadow-primary-200/20 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Follow
                        </button>
                        <button className="px-8 py-2.5 border-2 border-primary-200 text-primary-200 hover:bg-primary-200/5 rounded-xl font-bold transition-all flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Message
                        </button>
                        <button className="p-2.5 hover:bg-neutral-300 rounded-xl transition-colors border-2 border-neutral-300">
                            <MoreHorizontal className="w-6 h-6 text-neutral-600" />
                        </button>
                    </div>
                </div>

                {/* User Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-black text-neutral-800 tracking-tight">{user.name}</h1>
                        <span className="text-primary-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path>
                            </svg>
                        </span>
                    </div>

                    <p className="text-neutral-600 font-medium">{user.handle}</p>

                    <div className="flex items-center gap-6 text-sm text-neutral-600 font-medium pt-1">
                        {user.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-primary-300" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.joinDate && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-primary-300" />
                                <span>Joined {user.joinDate}</span>
                            </div>
                        )}
                    </div>

                    {user.bio && (
                        <p className="text-neutral-800 text-base leading-relaxed max-w-2xl font-medium">
                            {user.bio}
                        </p>
                    )}

                    {/* Interest Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="px-4 py-1.5 bg-neutral-200 text-primary-200 rounded-xl text-sm font-bold hover:bg-primary-100/10 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


