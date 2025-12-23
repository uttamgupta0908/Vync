'use client';

import { useFeed } from '../hooks/useFeed';
import FeedList from './FeedList';
import { FeedSkeleton } from '@/src/shared/ui/LoadingSkeleton';
import ErrorState from '@/src/shared/ui/ErrorState';

/**
 * Feed Container (Smart Component)
 * Handles data fetching, loading states, and error handling
 */
export default function FeedContainer() {
    const { data: posts, isLoading, error, refetch } = useFeed();

    if (isLoading) {
        return <FeedSkeleton />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load feed. Please try again."
                retry={() => refetch()}
            />
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-neutral-600 text-lg">No posts yet. Start following people!</p>
            </div>
        );
    }

    return <FeedList posts={posts} />;
}
