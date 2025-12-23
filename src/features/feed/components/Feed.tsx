'use client';

import { Image as ImageIcon, Smile, Calendar, BarChart2 } from 'lucide-react';
import Avatar from '@/src/shared/ui/Avatar';
import FeedContainer from '@/src/features/feed/components/FeedContainer';

const currentUser = {
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
};

export default function Feed() {
    return (
        <div className="flex-1 min-h-screen pb-20 sm:pb-0 pt-6 px-4">
            {/* Mobile Header with Avatar */}
            <div className="sm:hidden sticky top-0 bg-neutral-100/80 backdrop-blur-md border-b border-neutral-300 px-4 py-3 z-10 flex justify-between items-center">
                <h1 className="text-xl font-bold text-neutral-800">Home</h1>
                <Avatar src={currentUser.avatar} alt="Profile" size="sm" />
            </div>

            {/* Desktop Post Input */}
            <div className="bg-neutral-100 rounded-2xl shadow-sm p-4 mb-4 hidden sm:block">
                <div className="flex gap-4">
                    <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        size="md"
                    />
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="What's happening?"
                            className="w-full text-xl placeholder-neutral-500 border-none focus:ring-0 p-0 py-2 bg-transparent outline-none"
                        />
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2 text-primary-300">
                                <button className="p-2 hover:bg-primary-100/10 rounded-full transition-colors">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-primary-100/10 rounded-full transition-colors">
                                    <BarChart2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-primary-100/10 rounded-full transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-primary-100/10 rounded-full transition-colors">
                                    <Calendar className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="bg-primary-300 text-neutral-100 px-6 py-2 rounded-xl font-bold hover:bg-primary-200 transition-colors shadow-md shadow-primary-300/20">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feed with React Query */}
            <FeedContainer />
        </div>
    );
}
