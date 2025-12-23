'use client';

import React from 'react';
import PostCard from './PostCard';
import { DetailsHeader } from '@/src/shared/layout';
import { Image, Smile } from 'lucide-react';
import { Post } from '@/src/shared/types';
import { currentUser } from '@/src/shared/data/mock';

interface PostDetailViewProps {
    post: Post;
}

export default function PostDetailView({ post }: PostDetailViewProps) {
    return (
        <div className="flex-1 min-h-screen flex flex-col pb-20 sm:pb-0 bg-neutral-400">
            <DetailsHeader />

            <div className="flex-1 p-6 px-14">
                {/* Main Post Card */}
                <div className="bg-neutral-100 rounded-2xl shadow-sm mb-4 overflow-hidden">
                    <PostCard post={post} isDetail />
                </div>

                {/* Reply Input Card */}
                <div className="bg-neutral-100 rounded-2xl shadow-sm mb-4 p-4">
                    <div className="flex gap-4">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full bg-neutral-300 object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Post your reply"
                                className="w-full text-lg placeholder-neutral-500 border-none focus:ring-0 p-0 py-2 bg-transparent outline-none"
                            />
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex gap-2 text-primary-300">
                                    <button className="p-2 hover:bg-primary-100/10 rounded-full transition-colors">
                                        <Image className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-primary-100/10 rounded-full transition-colors">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <button className="bg-primary-300 text-neutral-100 px-5 py-1.5 rounded-full font-bold hover:bg-primary-200 transition-colors disabled:opacity-50">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-neutral-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-neutral-200">
                        <h3 className="font-bold text-neutral-800">Comments (87)</h3>
                    </div>

                    <div className="divide-y divide-neutral-200">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="px-4 py-4 hover:bg-neutral-200/30 transition-colors">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-neutral-300 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-neutral-800 hover:underline cursor-pointer">User {i}</span>
                                                <span className="text-neutral-600 text-sm">@user{i}</span>
                                                <span className="text-neutral-600 text-sm">·</span>
                                                <span className="text-neutral-600 text-sm hover:underline cursor-pointer">{i}h</span>
                                            </div>
                                            <button className="text-neutral-500 hover:text-primary-300 p-1 rounded-full hover:bg-primary-100/10">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></svg>
                                            </button>
                                        </div>
                                        <p className="text-neutral-600 text-sm mt-1">Replying to <span className="text-primary-300 hover:underline cursor-pointer">@{post.author.handle}</span></p>
                                        <p className="text-neutral-800 mt-2 text-[15px] leading-relaxed">
                                            This is a reply to the post. It contains some text to simulate a conversation. It looks cleaner and more organized now.
                                        </p>

                                        <div className="flex items-center gap-6 mt-3 text-neutral-500">
                                            <button className="flex items-center gap-2 group hover:text-primary-300 transition-colors">
                                                <div className="p-2 rounded-full group-hover:bg-primary-100/10 transition-colors">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                                </div>
                                                <span className="text-xs">2</span>
                                            </button>
                                            <button className="flex items-center gap-2 group hover:text-angry-500 transition-colors">
                                                <div className="p-2 rounded-full group-hover:bg-angry-100/50 transition-colors">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                </div>
                                                <span className="text-xs">24</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 py-4 border-t border-neutral-200">
                        <button className="text-primary-300 font-bold text-sm hover:underline w-full text-center">
                            Load More Comments
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
