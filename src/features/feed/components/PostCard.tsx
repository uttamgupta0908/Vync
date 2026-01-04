'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@/src/shared/types';
import { Avatar } from '@/src/shared/ui';
import PostHeader from './post-card/PostHeader';
import PostContent from './post-card/PostContent';
import PostMedia from './post-card/PostMedia';
import PostActions from './post-card/PostActions';

interface PostCardProps {
    post: Post;
    isDetail?: boolean;
}

export default function PostCard({ post, isDetail }: PostCardProps) {
    const router = useRouter();

    const handleCardClick = (e: React.MouseEvent) => {
        if (!isDetail) {
            e.preventDefault();
            router.push(`/details/${post.id}`);
        }
    };

    const content = (
        <article className={`flex gap-3 ${isDetail ? 'p-0' : 'p-4'}`}>
            {!isDetail && (
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href={`/profile/${post.user.username}`} className="shrink-0 block">
                        <Avatar
                            src={post.user.avatar_url || ''}
                            alt={post.user.full_name || 'User'}
                            className="hover:opacity-90 transition-opacity cursor-pointer"
                        />
                    </Link>
                </div>
            )}

            <div className="flex-1 min-w-0">
                <PostHeader post={post} isDetail={isDetail} />
                <PostContent content={post.content} isDetail={isDetail} />
                <PostMedia media={post.media || []} isDetail={isDetail} />

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

                <PostActions post={post} isDetail={isDetail} />
            </div>
        </article>
    );

    if (isDetail) {
        return <div className="block border-b border-neutral-300 cursor-default px-4 pt-4">{content}</div>;
    }

    return (
        <div
            onClick={handleCardClick}
            className="block bg-neutral-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
        >
            {content}
        </div>
    );
}
