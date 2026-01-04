'use client';

import React from 'react';
import { useCommunities } from '../hooks/useCommunities';
import { FeedSkeleton } from '@/src/shared/ui/LoadingSkeleton';
import ErrorState from '@/src/shared/ui/ErrorState';
import CategoryFilter from './CategoryFilter';
import TrendingSection from './TrendingSection';
import AllCommunitiesSection from './AllCommunitiesSection';

import { Plus, Filter } from 'lucide-react';

/**
 * Communities Container (Smart Component)
 * Handles data fetching and state management for communities
 */
export default function CommunitiesContainer() {
    const [activeCategory, setActiveCategory] = React.useState('All');
    const categories = ['All', 'Trending', 'Technology', 'Design', 'Sports', 'Entertainment', 'Gaming'];
    const { data: communities, isLoading, error, refetch } = useCommunities(activeCategory);

    if (isLoading) {
        return (
            <div className="p-8 max-w-[1600px] mx-auto">
                <FeedSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 max-w-[1600px] mx-auto">
                <ErrorState
                    message="Failed to load communities. Please try again."
                    retry={() => refetch()}
                />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-[1600px] mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">Discover Communities</h1>
                    <p className="text-neutral-600 text-[15px]">Find and join communities that match your interests</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-neutral-300 bg-neutral-100 text-neutral-600 rounded-xl font-semibold hover:bg-neutral-300 transition-colors flex items-center gap-2 text-sm">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm shadow-sm hover:shadow-md">
                        <Plus className="w-4 h-4" />
                        Create Community
                    </button>
                </div>
            </div>

            <div className="mb-10">
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />
            </div>

            <div className="space-y-10">
                {(activeCategory === 'Trending' || activeCategory === 'All') && (
                    <TrendingSection />
                )}

                <div>
                    <AllCommunitiesSection communities={communities || []} />
                </div>
            </div>
        </div>
    );
}
