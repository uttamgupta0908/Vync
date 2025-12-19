import React from 'react';
import CommunityCard from './CommunityCard';
import { Palette, Code2, Dumbbell } from 'lucide-react';

export default function TrendingSection() {
    const trendingCommunities = [
        {
            name: 'Design Hub',
            handle: '@designhub',
            description: 'A community for designers to share work, get feedback, and discuss design trends.',
            icon: Palette,
            memberCount: '1.5K',
            postCount: '2K posts',
            badge: 'Trending',
            headerColor: 'bg-primary-300',
        },
        {
            name: 'Tech Talk',
            handle: '@techtalk',
            description: 'Discuss the latest in technology, programming, AI, and software development.',
            icon: Code2,
            memberCount: '5.8K',
            postCount: '5K posts',
            badge: 'Hot',
            headerColor: 'bg-accent-500',
        },
        {
            name: 'Fitness Journey',
            handle: '@fitnessjourney',
            description: 'Share your fitness goals, workout routines, and healthy lifestyle tips.',
            icon: Dumbbell,
            memberCount: '3K',
            postCount: '2K posts',
            badge: 'Active',
            headerColor: 'bg-secondary-400',
        },
    ];

    return (
        <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🔥</span>
                <h2 className="text-xl font-bold text-neutral-800">Trending Communities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingCommunities.map((community) => (
                    <div key={community.handle} className="h-full">
                        <CommunityCard
                            {...community}
                            variant="trending"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
