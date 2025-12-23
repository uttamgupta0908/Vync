import Link from 'next/link';
import { MessageCircle, Heart } from 'lucide-react';
import Avatar from '@/src/shared/ui/Avatar';

interface ProfilePost {
    id: string;
    title: string;
    description: string;
    image?: string;
    author: {
        name: string;
        avatar: string;
    };
    timestamp: string;
    comments: number;
    likes: number;
}

interface ProfilePostsGridProps {
    posts: ProfilePost[];
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
                    {post.image && (
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            />
                        </div>
                    )}

                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Avatar src={post.author.avatar} alt={post.author.name} size="sm" />
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-neutral-800 text-sm truncate">
                                    {post.author.name}
                                </p>
                                <p className="text-xs text-neutral-600 font-medium">{post.timestamp}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-extrabold text-neutral-800 text-lg leading-tight group-hover:text-primary-200 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-sm text-neutral-600 line-clamp-2 font-medium leading-relaxed">
                                {post.description}
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
        </div>
    );
}

