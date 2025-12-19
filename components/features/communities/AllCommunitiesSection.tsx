import React from 'react';
import CommunityCard from './CommunityCard';
import { Gamepad2, Utensils, Camera, BookOpen, Music, Plane } from 'lucide-react';

export default function AllCommunitiesSection() {
    const communities = [
        {
            name: 'Gaming Zone',
            handle: '@gamingzone',
            description: 'Gaming news, reviews, and discussions for all platforms.',
            icon: Gamepad2,
            memberCount: '1.1K',
            tag: 'Gaming',
            headerColor: 'bg-primary-300', // for icon bg
        },
        {
            name: 'Foodie Paradise',
            handle: '@foodieparadise',
            description: 'Share recipes, restaurant reviews, and culinary adventures.',
            icon: Utensils,
            memberCount: '7K',
            tag: 'Food',
            headerColor: 'bg-accent-500',
        },
        {
            name: 'Photo Collective',
            handle: '@photocollective',
            description: 'Photography enthusiasts sharing tips, critiques, and galleries.',
            icon: Camera,
            memberCount: '4K',
            tag: 'Art',
            headerColor: 'bg-primary-400',
        },
        {
            name: 'Book Club',
            handle: '@bookclub',
            description: 'Discuss books, share recommendations, and join reading challenges.',
            icon: BookOpen,
            memberCount: '9K',
            tag: 'Books',
            headerColor: 'bg-primary-100',
        },
        {
            name: 'Music Lovers',
            handle: '@musiclovers',
            description: 'Share playlists, discover new artists, and discuss music theory.',
            icon: Music,
            memberCount: '6K',
            tag: 'Music', // Image has "Music" tag with pink/red bg
            headerColor: 'bg-angry-500',
        },
        {
            name: 'Travel Tales',
            handle: '@traveltales',
            description: 'Share travel stories, tips, and destination recommendations.',
            icon: Plane,
            memberCount: '2K',
            tag: 'Travel',
            headerColor: 'bg-secondary-500',
        },
    ];

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">All Communities</h2>
                <div className="flex gap-2 text-neutral-600">
                    <button className="p-2 hover:bg-neutral-300 rounded-lg transition-colors text-neutral-800">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-neutral-300 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communities.map((community) => (
                    <div key={community.handle} className="h-full">
                        <CommunityCard
                            {...community}
                            variant="default"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
