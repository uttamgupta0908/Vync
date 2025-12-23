import React from 'react';
import CommunityCard from './CommunityCard';
import { Gamepad2, Utensils, Camera, BookOpen, Music, Plane } from 'lucide-react';
import { Community } from '../services';

interface AllCommunitiesSectionProps {
    communities: Community[];
}

export default function AllCommunitiesSection({ communities }: AllCommunitiesSectionProps) {
    // Icons mapping based on category or name for consistency
    const getIcon = (category: string) => {
        switch (category) {
            case 'Gaming': return Gamepad2;
            case 'Food': return Utensils;
            case 'Art': return Camera;
            case 'Books': return BookOpen;
            case 'Music': return Music;
            case 'Travel': return Plane;
            default: return Gamepad2;
        }
    };

    const getHeaderColor = (category: string) => {
        switch (category) {
            case 'Gaming': return 'bg-primary-300';
            case 'Food': return 'bg-accent-500';
            case 'Art': return 'bg-primary-400';
            case 'Books': return 'bg-primary-100';
            case 'Music': return 'bg-angry-500';
            case 'Travel': return 'bg-secondary-500';
            default: return 'bg-neutral-400';
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">All Communities</h2>
                {/* ... existing buttons ... */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communities.map((community) => (
                    <div key={community.id} className="h-full">
                        <CommunityCard
                            name={community.name}
                            handle={`@${community.name.toLowerCase().replace('r/', '')}`}
                            description={community.description}
                            icon={getIcon(community.category)}
                            memberCount={`${(community.members / 1000).toFixed(1)}K`}
                            tag={community.category}
                            headerColor={getHeaderColor(community.category)}
                            variant="default"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
