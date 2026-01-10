'use client';

import NextImage from 'next/image';
import { Media } from '@/src/shared/types';

interface PostMediaProps {
    media: Media[];
    isDetail?: boolean;
}

export default function PostMedia({ media, isDetail = false }: PostMediaProps) {
    if (!media || media.length === 0) return null;

    return (
        <div className={`mt-3 rounded-2xl overflow-hidden border border-neutral-300 ${isDetail ? 'mt-6' : ''} space-y-2`}>
            {media.map((item) => (
                <div key={item.id} className="relative">
                    {item.type === 'image' ? (
                        <NextImage
                            src={item.url}
                            alt={item.alt_text || "Post content"}
                            width={item.width || 800}
                            height={item.height || 500}
                            className="w-full h-auto object-cover max-h-[600px]"
                        />
                    ) : (
                        <video
                            src={item.url}
                            controls
                            className="w-full h-auto max-h-[600px] bg-neutral-400"
                            poster={item.thumbnail_url}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
