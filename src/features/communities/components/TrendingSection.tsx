'use client';

import React from 'react';
import CommunityCard from './CommunityCard';
import { useTrendingCommunities } from '@/src/features/communities/hooks/useCommunities';
import { CommunitySkeleton } from '@/src/shared/ui/LoadingSkeleton';
import { TrendingUp, Sparkles } from 'lucide-react';

export default function TrendingSection() {
    const { data: trendingData, isLoading, isError } = useTrendingCommunities();
    const trendingCommunities = trendingData?.trending_communities || [];

    if (isError) {
        return (
            <div className="py-20 text-center bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-neutral-200">
                <p className="text-neutral-500 font-medium italic">Unable to load trending communities at the moment.</p>
            </div>
        );
    }

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-2xl">
                        <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Trending Now</h2>
                        <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Global Communities</p>
                    </div>
                </div>
                {!isLoading && trendingCommunities.length > 0 && (
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full border border-accent-100 mb-auto">
                        <Sparkles className="w-4 h-4 text-accent-600" />
                        <span className="text-xs font-black text-accent-700 uppercase tracking-wider">Top 10 Growing</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    // Premium Skeleton State
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-[340px]">
                            <CommunitySkeleton variant="trending" />
                        </div>
                    ))
                ) : (
                    trendingCommunities.map((community, index) => (
                        <div
                            key={community.id}
                            className="h-full"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <CommunityCard
                                name={community.name}
                                handle={`v/${community.slug || community.id.substring(0, 8)}`}
                                description={community.description || ""}
                                memberCount={`${community.followers_count || community.members || 0}`}
                                iconUrl={community.image || undefined}
                                variant="trending"
                                badge={index === 0 ? '🔥 Hottest' : index < 3 ? '⚡ Trending' : undefined}
                                headerColor={index === 0 ? 'bg-purple-500' : index < 3 ? 'bg-orange-500' : 'bg-slate-500'}
                            />
                        </div>
                    ))
                )}

                {!isLoading && trendingCommunities.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-neutral-200">
                        <p className="text-neutral-500 font-medium italic">No trending communities found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
