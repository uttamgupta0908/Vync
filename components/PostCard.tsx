import Link from 'next/link';
import { Post } from '@/types';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
    post: Post;
    isDetail?: boolean;
}

export default function PostCard({ post, isDetail = false }: PostCardProps) {
    const content = (
        <article className={`flex gap-3 ${isDetail ? 'p-0' : 'p-4'}`}>
            {!isDetail && (
                <div className="flex-shrink-0">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full bg-gray-200 hover:opacity-90 transition-opacity object-cover"
                    />
                </div>
            )}

            <div className="flex-1 min-w-0">
                {!isDetail && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm truncate">
                            <span className="font-bold text-gray-900 hover:underline">{post.author.name}</span>
                            <span className="text-gray-500">{post.author.handle}</span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500 hover:underline">{post.timestamp}</span>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-[#8B5CF6] hover:bg-indigo-50 rounded-full transition-colors group">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {isDetail && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-12 h-12 rounded-full bg-gray-200 object-cover"
                            />
                            <div>
                                <div className="flex items-center gap-1">
                                    <p className="font-bold text-gray-900 text-base hover:underline">{post.author.name}</p>
                                    <span className="text-[#8B5CF6]">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path></svg>
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">{post.author.handle}</p>
                            </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-[#8B5CF6] hover:bg-indigo-50 rounded-full transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className={`text-gray-900 whitespace-pre-wrap ${isDetail ? 'text-[22px] leading-8 font-medium' : 'text-[15px] mt-0.5'}`}>
                    {post.content}
                </div>

                {post.image && (
                    <div className={`mt-3 rounded-2xl overflow-hidden border border-gray-200 ${isDetail ? 'mt-6' : ''}`}>
                        <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                    </div>
                )}

                {isDetail && (
                    <div className="py-4 border-b border-gray-100 mt-4">
                        <div className="flex items-center gap-1 text-gray-500 text-[15px]">
                            <span className="hover:underline cursor-pointer">2:30 PM</span>
                            <span>·</span>
                            <span className="hover:underline cursor-pointer">Nov 28, 2024</span>
                            <span>·</span>
                            <span className="font-bold text-gray-900">{post.views.toLocaleString()}</span>
                            <span>Views</span>
                        </div>
                    </div>
                )}

                {isDetail && (
                    <div className="py-4 border-b border-gray-100 flex gap-6 text-sm">
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <span className="font-bold text-gray-900">{post.reposts}</span>
                            <span className="text-gray-500">Reposts</span>
                        </div>
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <span className="font-bold text-gray-900">{post.likes}</span>
                            <span className="text-gray-500">Likes</span>
                        </div>
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <span className="font-bold text-gray-900">12</span>
                            <span className="text-gray-500">Quotes</span>
                        </div>
                    </div>
                )}

                <div className={`flex items-center justify-between text-gray-500 ${isDetail ? 'py-3 border-b border-gray-100 justify-around' : 'mt-3 max-w-md'}`}>
                    <button className="flex items-center gap-2 group hover:text-[#8B5CF6] transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                            <MessageCircle className={`${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`} />
                        </div>
                        <span className={`text-xs ${isDetail ? 'hidden' : ''}`}>{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 group hover:text-green-500 transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                            <Repeat2 className={`${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`} />
                        </div>
                        <span className={`text-xs ${isDetail ? 'hidden' : ''}`}>{post.reposts}</span>
                    </button>

                    <button className="flex items-center gap-2 group hover:text-pink-500 transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                            <Heart className={`${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`} />
                        </div>
                        <span className={`text-xs ${isDetail ? 'hidden' : ''}`}>{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 group hover:text-[#8B5CF6] transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                            <BarChart2 className={`${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`} />
                        </div>
                        <span className={`text-xs ${isDetail ? 'hidden' : ''}`}>{post.views}</span>
                    </button>

                    <button className="flex items-center gap-2 group hover:text-[#8B5CF6] transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                            <Share className={`${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`} />
                        </div>
                    </button>
                </div>
            </div>
        </article>
    );

    if (isDetail) {
        return <div className="block border-b border-gray-100 cursor-default px-4 pt-4">{content}</div>;
    }

    return (
        <Link
            href={`/details/${post.id}`}
            className="block border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
        >
            {content}
        </Link>
    );
}
