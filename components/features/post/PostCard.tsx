import Link from 'next/link';
import NextImage from 'next/image';
import { Post } from '@/types';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import IconButton from '@/components/ui/IconButton';

interface PostCardProps {
    post: Post;
    isDetail?: boolean;
}

export default function PostCard({ post, isDetail = false }: PostCardProps) {
    const content = (
        <article className={`flex gap-3 ${isDetail ? 'p-0' : 'p-4'}`}>
            {!isDetail && (
                <div className="flex-shrink-0">
                    <Avatar
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="hover:opacity-90 transition-opacity"
                    />
                </div>
            )}

            <div className="flex-1 min-w-0">
                {!isDetail && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm truncate">
                            <span className="font-bold text-neutral-800 hover:underline">{post.author.name}</span>
                            <span className="text-neutral-600">{post.author.handle}</span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-neutral-600 hover:underline">{post.timestamp}</span>
                        </div>
                        <IconButton icon={MoreHorizontal} className="text-neutral-500" />
                    </div>
                )}

                {isDetail && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
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

                <div className={`flex items-center justify-between text-neutral-500 ${isDetail ? 'py-3 border-b border-neutral-300 justify-around' : 'mt-3 max-w-md'}`}>
                    <IconButton
                        icon={MessageCircle}
                        label={!isDetail ? post.comments : undefined}
                        size={isDetail ? 'md' : 'sm'}
                    />

                    <IconButton
                        icon={Repeat2}
                        label={!isDetail ? post.reposts : undefined}
                        color="green"
                        size={isDetail ? 'md' : 'sm'}
                    />

                    <IconButton
                        icon={Heart}
                        label={!isDetail ? post.likes : undefined}
                        color="pink"
                        size={isDetail ? 'md' : 'sm'}
                    />

                    <IconButton
                        icon={BarChart2}
                        label={!isDetail ? post.views : undefined}
                        size={isDetail ? 'md' : 'sm'}
                    />

                    <IconButton
                        icon={Share}
                        size={isDetail ? 'md' : 'sm'}
                    />
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
