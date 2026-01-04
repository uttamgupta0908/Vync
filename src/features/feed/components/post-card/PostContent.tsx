'use client';

interface PostContentProps {
    content: string;
    isDetail?: boolean;
}

export default function PostContent({ content, isDetail = false }: PostContentProps) {
    return (
        <div className={`text-neutral-800 whitespace-pre-wrap ${isDetail ? 'text-xl leading-relaxed font-medium' : 'text-[15px] mt-0.5'}`}>
            {content}
        </div>
    );
}
