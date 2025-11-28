import { posts, currentUser } from '@/data/mock';
import PostCard from '@/components/PostCard';
import DetailsHeader from '@/components/DetailsHeader';
import { notFound } from 'next/navigation';
import { Image, Smile, Calendar, BarChart2 } from 'lucide-react';

export default async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex-1 min-h-screen flex flex-col pb-20 sm:pb-0">
            <DetailsHeader />

            <div className="flex-1">
                <PostCard post={post} isDetail />

                {/* Reply Input */}
                <div className="px-4 py-4 border-b border-gray-100 flex gap-4">
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                    />
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Post your reply"
                            className="w-full text-lg placeholder-gray-400 border-none focus:ring-0 p-0 py-2 bg-transparent"
                        />
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex gap-2 text-[#8B5CF6]">
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <Image className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="bg-[#8B5CF6] text-white px-5 py-1.5 rounded-full font-bold hover:bg-[#7C3AED] transition-colors disabled:opacity-50">
                                Reply
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pb-20">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-900 hover:underline cursor-pointer">User {i}</span>
                                            <span className="text-gray-500 text-sm">@user{i}</span>
                                            <span className="text-gray-500 text-sm">·</span>
                                            <span className="text-gray-500 text-sm hover:underline cursor-pointer">{i}h</span>
                                        </div>
                                        <button className="text-gray-400 hover:text-[#8B5CF6] p-1 rounded-full hover:bg-indigo-50">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-[15px] mt-1">Replying to <span className="text-[#8B5CF6] hover:underline cursor-pointer">@{post.author.handle}</span></p>
                                    <p className="text-gray-900 mt-1 text-[15px] leading-relaxed">
                                        This is a reply to the post. It contains some text to simulate a conversation. It looks cleaner and more organized now.
                                    </p>

                                    <div className="flex items-center justify-between mt-3 max-w-md text-gray-500">
                                        <button className="flex items-center gap-2 group hover:text-[#8B5CF6] transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                            </div>
                                            <span className="text-xs">2</span>
                                        </button>
                                        <button className="flex items-center gap-2 group hover:text-green-500 transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                                            </div>
                                            <span className="text-xs">5</span>
                                        </button>
                                        <button className="flex items-center gap-2 group hover:text-pink-500 transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            </div>
                                            <span className="text-xs">24</span>
                                        </button>
                                        <button className="flex items-center gap-2 group hover:text-[#8B5CF6] transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                            </div>
                                            <span className="text-xs">1.2k</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
