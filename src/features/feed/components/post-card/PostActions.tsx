'use client';

import { MessageCircle, Repeat2, Heart, BarChart2, Share } from 'lucide-react';
import { InlineSpinner } from '@/src/shared/ui';
import { Post } from '@/src/shared/types';
import { useLikePost } from '../../hooks/useFeed';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';

interface PostActionsProps {
    post: Post;
    isDetail?: boolean;
}

export default function PostActions({ post, isDetail = false }: PostActionsProps) {
    const likeMutation = useLikePost();
    const { isAuthenticated } = useAuth();
    const { openLoginModal } = useAuthUI();

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
                has_liked: post.has_liked || false,
            });
        });
    };

    return (
        <div
            className={`flex items-center justify-between text-neutral-500 ${isDetail
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
                        className={`w-5 h-5 ${post.has_liked
                            ? "fill-pink-500 text-pink-500"
                            : "text-neutral-500 group-hover:text-pink-500"
                            }`}
                    />
                )}
                {!isDetail && (
                    <span
                        className={`text-xs ${post.has_liked ? "text-pink-500" : "group-hover:text-pink-500"
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
    );
}
