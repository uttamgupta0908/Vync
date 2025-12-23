import { posts } from '@/src/shared/data/mock';
import PostDetailView from '@/src/features/feed/components/PostDetailView';
import { notFound } from 'next/navigation';

export default async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return <PostDetailView post={post} />;
}

