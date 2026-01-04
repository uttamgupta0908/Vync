import PostDetailView from '@/src/features/feed/components/PostDetailView';
import { notFound } from 'next/navigation';
import { fetchPostById } from '@/src/features/feed/services';

export default async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <PostDetailView id={id} />;
}

