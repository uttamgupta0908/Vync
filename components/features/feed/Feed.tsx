'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import PostCard from '../post/PostCard';
import { currentUser } from '@/data/mock';
import { Image as ImageIcon, Smile, Calendar, BarChart2, Loader2 } from 'lucide-react';
import { api } from '@/services/api';

import Avatar from '@/components/ui/Avatar';

export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                const response = await api.posts.list(1);
                setPosts(response.data);
                setHasMore(!!response.nextPage);
                setPage(response.nextPage || 1);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialPosts();
    }, []);

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        try {
            const response = await api.posts.list(page);
            setPosts((prev) => [...prev, ...response.data]);
            setHasMore(!!response.nextPage);
            setPage(response.nextPage || page);
        } catch (error) {
            console.error('Failed to load more posts:', error);
        } finally {
            setLoadingMore(false);
        }
    };

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
                            className="w-full text-xl placeholder-gray-400 border-none focus:ring-0 p-0 py-2 bg-transparent outline-none"
                        />
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2 text-indigo-500">
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <ImageIcon className="w-5 h-5" />
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

            {loading && (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
                </div>
            )}

            {!loading && hasMore && (
                <div className="flex justify-center p-8">
                    <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="flex items-center gap-2 px-6 py-2 text-[#8B5CF6] font-medium hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-50"
                    >
                        {loadingMore ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Load more'
                        )}
                    </button>
                </div>
            )}

            {!loading && !hasMore && posts.length > 0 && (
                <div className="text-center p-8 text-gray-500">
                    You&apos;ve reached the end!
                </div>
            )}
        </div>
    );
}
