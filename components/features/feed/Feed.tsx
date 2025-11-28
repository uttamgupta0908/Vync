import { Post } from '@/types';
import PostCard from '../post/PostCard';
import { currentUser } from '@/data/mock';
import { Image, Smile, Calendar, BarChart2 } from 'lucide-react';

import Avatar from '@/components/ui/Avatar';

interface FeedProps {
    posts: Post[];
}

export default function Feed({ posts }: FeedProps) {
    return (
        <div className="flex-1 min-h-screen pb-20 sm:pb-0">



            {/* Mobile Header with Avatar */}
            <div className="sm:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 z-10 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">Home</h1>
                <Avatar src={currentUser.avatar} alt="Profile" size="sm" />
            </div>

            {/* Desktop Post Input */}
            <div className="p-4 border-b border-gray-100 hidden sm:block">
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
                            className="w-full text-xl placeholder-gray-400 border-none focus:ring-0 p-0 py-2 bg-transparent"
                        />
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2 text-indigo-500">
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <Image className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <BarChart2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <Calendar className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="bg-[#8B5CF6] text-white px-6 py-2 rounded-full font-bold hover:bg-[#7C3AED] transition-colors shadow-md shadow-indigo-200">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
