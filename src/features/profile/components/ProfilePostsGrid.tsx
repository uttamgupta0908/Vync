import Link from 'next/link';
import { MessageCircle, Heart } from 'lucide-react';
import Avatar from '@/src/shared/ui/Avatar';
import { Post } from '@/src/shared/types';

interface ProfilePostsGridProps {
    posts: Post[];
}

export default function ProfilePostsGrid({ posts }: ProfilePostsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={`/details/${post.id}`}
                    className="bg-neutral-100 rounded-[32px] shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer border border-neutral-300/50"
                >
                    {post.media && post.media.length > 0 && (
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-200 relative">
                            {post.media[0].type === 'image' ? (
                                <img
                                    src={post.media[0].url}
                                    alt={post.media[0].alt_text || post.content}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                />
                            ) : (
                                <video
                                    src={post.media[0].url}
                                    className="w-full h-full object-cover"
                                    poster={post.media[0].thumbnail_url}
                                />
                            )}
                            {post.media.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                    +{post.media.length - 1}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Avatar src={post.user.avatar_url} alt={post.user.full_name} size="sm" />
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-neutral-800 text-sm truncate">
                                    {post.user.full_name}
                                </p>
                                <p className="text-xs text-neutral-600 font-medium">{new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {post.title && (
                                <h3 className="font-extrabold text-neutral-800 text-lg leading-tight group-hover:text-primary-200 transition-colors">
                                    {post.title}
                                </h3>
                            )}
                            <p className="text-sm text-neutral-600 line-clamp-2 font-medium leading-relaxed">
                                {post.content}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-300/50">
                            <div className="flex items-center gap-4 text-neutral-600">
                                <div className="flex items-center gap-1.5 hover:text-primary-200 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-xs font-bold">{post.comments}</span>
                                </div>
                                <div className="flex items-center gap-1.5 hover:text-angry-500 transition-colors">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-xs font-bold">{post.likes}</span>
                                </div>
                            </div>
                            <div className="text-primary-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div >
    );
}
