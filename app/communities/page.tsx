"use client";
import React, { useState } from 'react';
import CategoryFilter from '@/components/features/communities/CategoryFilter';
import TrendingSection from '@/components/features/communities/TrendingSection';
import AllCommunitiesSection from '@/components/features/communities/AllCommunitiesSection';
import { Plus, Filter } from 'lucide-react';
import CommunitiesHeader from '@/components/features/communities/CommunitiesHeader';

export default function CommunitiesPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Trending', 'Technology', 'Design', 'Sports', 'Entertainment', 'Gaming'];

    return (
        <div className="min-h-screen bg-neutral-400 text-neutral-800 w-full">
            <CommunitiesHeader />

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

                {/* Category Tabs */}
                <div className="mb-10">
                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>

                {/* Main Content */}
                <div className="space-y-10">
                    {/* Conditionally render or show all based on filter? 
                        For "pixel perfect" mock tasks, usually we just show the layout unless logic is requested.
                        The image shows both sections visible when "All" is selected presumably?
                        Or maybe "Trending" tab shows just trending.
                        I'll stick to showing both sections as per the "Discover Communities" dashboard look.
                        The tabs might filter the "All Communities" list in a real app.
                    */}
                    <div className={activeCategory === 'Trending' ? 'block' : activeCategory === 'All' ? 'block' : 'hidden'}>
                        <TrendingSection />
                    </div>

                    <div>
                        <AllCommunitiesSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
