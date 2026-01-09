import PostDetailView from '@/src/features/feed/components/PostDetailView';

export default async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <PostDetailView id={id} />;
}

