'use client';

import Link from 'next/link';
import { Post } from '@/src/shared/types';
import { Avatar, IconButton } from '@/src/shared/ui';
import { MoreHorizontal } from 'lucide-react';

interface PostHeaderProps {
    post: Post;
    isDetail?: boolean;
}

export default function PostHeader({ post, isDetail = false }: PostHeaderProps) {
    if (isDetail) {
        return (
            <div className="flex items-center justify-between mb-6">
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href={`/profile/${post?.user?.username}`} className="flex items-center gap-3 cursor-pointer">
                        <Avatar
                            src={post?.user?.avatar_url || ''}
                            alt={post?.user?.full_name || 'User'}
                            size="lg"
                        />
                        <div>
                            <div className="flex items-center gap-1">
                                <p className="font-bold text-neutral-800 text-base hover:underline">{post?.user?.full_name}</p>
                                {post?.user?.is_verified && (
                                    <span className="text-primary-300">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path></svg>
                                    </span>
                                )}
                            </div>
                            <p className="text-neutral-600 text-sm">@{post?.user?.username}</p>
                        </div>
                    </Link>
                </div>
                <IconButton icon={MoreHorizontal} size="md" className="text-neutral-500" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm truncate">
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href={`/profile/${post?.user?.username}`} className="font-bold text-neutral-800 hover:underline cursor-pointer">{post?.user?.full_name}</Link>
                </div>
                <span className="text-neutral-600">@{post?.user?.username}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-600 hover:underline">
                    {typeof window !== 'undefined' ? new Date(post.created_at).toLocaleDateString() : ''}
                </span>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <IconButton icon={MoreHorizontal} className="text-neutral-500" />
            </div>
        </div>
    );
}
