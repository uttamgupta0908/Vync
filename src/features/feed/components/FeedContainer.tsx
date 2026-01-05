'use client';

import { useEffect, useCallback } from 'react';
import { useFeed } from '../hooks/useFeed';
import FeedList from './FeedList';
import { FeedSkeleton } from '@/src/shared/ui/LoadingSkeleton';
import ErrorState from '@/src/shared/ui/ErrorState';
import { useIntersectionObserver } from '@/src/shared/hooks/useIntersectionObserver';
import { Loader2 } from 'lucide-react';

/**
 * Feed Container (Smart Component)
 * Handles data fetching, loading states, and error handling
 */
export default function FeedContainer() {
    const {
        data,
        isLoading,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useFeed();

    const handleIntersect = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    const { ref } = useIntersectionObserver({
        threshold: 0.1,
        // Keep enabled if we have more pages, but rely on onIntersect to trigger fetch
        enabled: hasNextPage,
        onIntersect: handleIntersect,
    });

    // Deduplicate posts to prevent key errors if backend/pagination overlaps
    const allPosts = data?.pages.flatMap((page) => page.results)
        .reduce<any[]>((acc, post) => {
            if (!acc.some(p => p.id === post.id)) {
                acc.push(post);
            }
            return acc;
        }, []) || [];

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

    if (!allPosts || allPosts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-neutral-600 text-lg">No posts yet. Start following people!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <FeedList posts={allPosts} />

            {/* Infinite Scroll Trigger */}
            {(hasNextPage || isFetchingNextPage) && (
                <div ref={ref} className="flex justify-center py-4 w-full h-10">
                    {isFetchingNextPage && (
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    )}
                </div>
            )}
        </div>
    );
}
