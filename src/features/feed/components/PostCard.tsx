'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { Post } from '@/src/shared/types';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal } from 'lucide-react';
import { Avatar, IconButton } from '@/src/shared/ui';
import { useLikePost } from '../hooks/useFeed';
import { InlineSpinner } from '@/src/shared/ui';
import { useAuth } from '@/src/shared/context/AuthContext';

interface PostCardProps {
    post: Post;
    isDetail?: boolean;
}

export default function PostCard({ post, isDetail = false }: PostCardProps) {
    const likeMutation = useLikePost();
    const { isAuthenticated, openLoginModal } = useAuth();

    const handleAuthAction = (e: React.MouseEvent, action?: () => void) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            openLoginModal();
            return;
        }

        action?.();
    };

    const handleLike = (e: React.MouseEvent) => {
        handleAuthAction(e, () => {
            likeMutation.mutate({
                postId: post.id,
                isLiked: post.isLiked || false,
            });
        });
    };

    const content = (
        <article className={`flex gap-3 ${isDetail ? 'p-0' : 'p-4'}`}>
            {!isDetail && (
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href={`/profile/${post.author.handle.replace('@', '')}`} className="shrink-0 block">
                        <Avatar
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="hover:opacity-90 transition-opacity cursor-pointer"
                        />
                    </Link>
                </div>
            )}

            <div className="flex-1 min-w-0">
                {!isDetail && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm truncate">
                            <div onClick={(e) => e.stopPropagation()}>
                                <Link href={`/profile/${post.author.handle.replace('@', '')}`} className="font-bold text-neutral-800 hover:underline cursor-pointer">{post.author.name}</Link>
                            </div>
                            <span className="text-neutral-600">{post.author.handle}</span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-neutral-600 hover:underline">{post.timestamp}</span>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <IconButton icon={MoreHorizontal} className="text-neutral-500" />
                        </div>
                    </div>
                )}

                {isDetail && (
                    <div className="flex items-center justify-between mb-6">
                        <div onClick={(e) => e.stopPropagation()}>
                            <Link href={`/profile/${post.author.handle.replace('@', '')}`} className="flex items-center gap-3 cursor-pointer">
                                <Avatar
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    size="lg"
                                />
                                <div>
                                    <div className="flex items-center gap-1">
                                        <p className="font-bold text-neutral-800 text-base hover:underline">{post.author.name}</p>
                                        <span className="text-primary-300">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path></svg>
                                        </span>
                                    </div>
                                    <p className="text-neutral-600 text-sm">{post.author.handle}</p>
                                </div>
                            </Link>
                        </div>
                        <IconButton icon={MoreHorizontal} size="md" className="text-neutral-500" />
                    </div>
                )}

                <div className={`text-neutral-800 whitespace-pre-wrap ${isDetail ? 'text-xl leading-relaxed font-medium' : 'text-[15px] mt-0.5'}`}>
                    {post.content}
                </div>

                {post.image && (
                    <div className={`mt-3 rounded-2xl overflow-hidden border border-neutral-300 ${isDetail ? 'mt-6' : ''}`}>
                        <NextImage
                            src={post.image}
                            alt="Post content"
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                )}

                {isDetail && (
                    <div className="py-4 border-b border-neutral-300 mt-4">
                        <div className="flex items-center gap-1 text-neutral-600 text-[15px]">
                            <span className="hover:underline cursor-pointer">2:30 PM</span>
                            <span>·</span>
                            <span className="hover:underline cursor-pointer">Nov 28, 2024</span>
                            <span>·</span>
                            <span className="font-bold text-neutral-800">{post.views.toLocaleString()}</span>
                            <span>Views</span>
                        </div>
                    </div>
                )}

                {isDetail && (
                    <div className="py-4 border-b border-neutral-300 flex gap-6 text-sm">
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <span className="font-bold text-neutral-800">{post.reposts}</span>
                            <span className="text-neutral-600">Reposts</span>
                        </div>
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <span className="font-bold text-neutral-800">{post.likes}</span>
                            <span className="text-neutral-600">Likes</span>
                        </div>
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <span className="font-bold text-neutral-800">12</span>
                            <span className="text-neutral-600">Quotes</span>
                        </div>
                    </div>
                )}

                {/* <div className={`flex items-center justify-between text-neutral-500 ${isDetail ? 'py-3 border-b border-neutral-300 justify-around' : 'mt-3 max-w-md'}`}>
                    <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 group text-neutral-500 hover:text-primary-300 group-hover:bg-primary-100/10 p-2 rounded-full transition-colors">
                        <div className={`p-2 rounded-full transition-colors ${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`}>
                            <MessageCircle className={isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'} />
                        </div>
                        {!isDetail && (
                            <span className="text-xs">{post.comments}</span>
                        )}
                    </button>

                    <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 group text-neutral-500 hover:text-success-500 group-hover:bg-success-100 p-2 rounded-full transition-colors">
                        <div className={`p-2 rounded-full transition-colors ${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`}>
                            <Repeat2 className={isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'} />
                        </div>
                        {!isDetail && (
                            <span className="text-xs">{post.reposts}</span>
                        )}
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            likeMutation.mutate({
                                postId: post.id,
                                isLiked: post.isLiked || false,
                            });
                        }}
                        disabled={likeMutation.isPending}
                        className="flex items-center gap-2 p-2 rounded-full hover:bg-pink-100 transition-colors group disabled:opacity-50"
                    >
                        {likeMutation.isPending ? (
                            <InlineSpinner size="sm" />
                        ) : (
                            <Heart
                                className={`w-5 h-5 ${post.isLiked ? 'fill-pink-500 text-pink-500' : 'text-neutral-500 group-hover:text-pink-500'}`}
                            />
                        )}
                        {!isDetail && (
                            <span className={`text-xs ${post.isLiked ? 'text-pink-500' : ' group-hover:text-pink-500'}`}>
                                {post.likes}
                            </span>
                        )}
                    </button>

                    <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 group text-neutral-500 hover:text-primary-300 group-hover:bg-primary-100/10 p-2 rounded-full transition-colors">
                        <div className={`p-2 rounded-full transition-colors ${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`}>
                            <BarChart2 className={isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'} />
                        </div>
                        {!isDetail && (
                            <span className="text-xs">{post.views}</span>
                        )}
                    </button>

                    <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 group text-neutral-500 hover:text-primary-300 group-hover:bg-primary-100/10 p-2 rounded-full transition-colors">
                        <div className={`p-2 rounded-full transition-colors ${isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'}`}>
                            <Share className={isDetail ? 'w-6 h-6' : 'w-[18px] h-[18px]'} />
                        </div>
                    </button>
                </div> */}
                <div
                    className={`flex items-center justify-between text-neutral-500  ${isDetail
                        ? "py-3 border-b border-neutral-300 justify-around"
                        : "mt-3 max-w-md "
                        }`}
                >
                    {/* Comment */}
                    <button
                        onClick={(e) => handleAuthAction(e)}
                        className="flex items-center gap-2 p-2 rounded-full transition-colors group hover:bg-primary-100/10"
                    >
                        <MessageCircle
                            className={isDetail ? "w-6 h-6 group-hover:text-primary-300" : "w-[18px] h-[18px] group-hover:text-primary-300"}
                        />
                        {!isDetail && <span className="text-xs">{post.comments}</span>}
                    </button>

                    {/* Repost */}
                    <button
                        onClick={(e) => handleAuthAction(e)}
                        className="flex items-center gap-2 p-2 rounded-full transition-colors group hover:bg-success-100"
                    >
                        <Repeat2
                            className={isDetail ? "w-6 h-6 group-hover:text-success-500" : "w-[18px] h-[18px] group-hover:text-success-500"}
                        />
                        {!isDetail && <span className="text-xs">{post.reposts}</span>}
                    </button>

                    {/* Like */}
                    <button
                        onClick={handleLike}
                        disabled={likeMutation.isPending}
                        className="flex items-center gap-2 p-2 rounded-full hover:bg-pink-100 transition-colors group disabled:opacity-50"
                    >
                        {likeMutation.isPending ? (
                            <InlineSpinner size="sm" />
                        ) : (
                            <Heart
                                className={`w-5 h-5 ${post.isLiked
                                    ? "fill-pink-500 text-pink-500"
                                    : "text-neutral-500 group-hover:text-pink-500"
                                    }`}
                            />
                        )}
                        {!isDetail && (
                            <span
                                className={`text-xs ${post.isLiked ? "text-pink-500" : "group-hover:text-pink-500"
                                    }`}
                            >
                                {post.likes}
                            </span>
                        )}
                    </button>

                    {/* Views */}
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 p-2 rounded-full transition-colors group hover:bg-primary-100/10"
                    >
                        <BarChart2
                            className={isDetail ? "w-6 h-6 group-hover:text-primary-300" : "w-[18px] h-[18px] group-hover:text-primary-300"}
                        />
                        {!isDetail && <span className="text-xs">{post.views}</span>}
                    </button>

                    {/* Share */}
                    <button
                        onClick={(e) => handleAuthAction(e)}
                        className="flex items-center gap-2 p-2 rounded-full transition-colors group hover:bg-primary-100/10"
                    >
                        <Share
                            className={isDetail ? "w-6 h-6 group-hover:text-primary-300" : "w-[18px] h-[18px] group-hover:text-primary-300"}
                        />
                    </button>
                </div>

            </div>
        </article>
    );

    if (isDetail) {
        return <div className="block border-b border-neutral-300 cursor-default px-4 pt-4">{content}</div>;
    }

    return (
        <Link
            href={`/details/${post.id}`}
            className="block bg-neutral-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
        >
            {content}
        </Link>
    );
}
