import React from 'react';
import { LucideIcon, Users, MessageSquare } from 'lucide-react';

interface CommunityCardProps {
    name: string;
    handle: string;
    description: string;
    icon: LucideIcon;
    memberCount: string;
    postCount?: string; // For trending
    tag?: string; // For all communities
    variant?: 'trending' | 'default';
    headerColor?: string; // e.g. "bg-purple-500", "bg-orange-500" for trending header or icon bg in default
    badge?: string; // "Trending", "Hot", "Active"
    badgeColor?: string; // Custom badge bg color if needed
}

export default function CommunityCard({
    name,
    handle,
    description,
    icon: Icon,
    memberCount,
    postCount,
    tag,
    variant = 'default',
    headerColor = 'bg-neutral-400',
    badge
}: CommunityCardProps) {
    // Helper to get icon color based on header color for harmony
    const getIconColorClass = () => {
        if (headerColor.includes('purple')) return 'text-primary-200';
        if (headerColor.includes('orange')) return 'text-accent-500';
        if (headerColor.includes('slate')) return 'text-secondary-400';
        return 'text-neutral-700';
    };

    const getTagColorClass = () => {
        if (tag === 'Gaming') return 'bg-neutral-200 text-primary-200'; // neutral-200 is purple transparency
        if (tag === 'Food') return 'bg-accent-300/20 text-accent-500';
        if (tag === 'Art') return 'bg-accent-100/20 text-accent-200';
        if (tag === 'Books') return 'bg-primary-100/10 text-primary-100';
        if (tag === 'Music') return 'bg-angry-100 text-angry-500';
        if (tag === 'Travel') return 'bg-secondary-200/20 text-secondary-500';
        return 'bg-neutral-300 text-neutral-600';
    }

    if (variant === 'trending') {
        return (
            <div className="bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-300 flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
                {/* Header with color */}
                <div className={`h-24 ${headerColor} relative`}>
                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center p-1 shadow-sm">
                        <div className={`w-full h-full rounded-xl bg-neutral-400 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <Icon className={`w-6 h-6 ${getIconColorClass()}`} />
                        </div>
                    </div>
                </div>

                <div className="pt-8 px-6 pb-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-bold text-lg text-neutral-800">{name}</h3>
                                {badge && (
                                    <span className="px-2 py-0.5 bg-neutral-300 text-neutral-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-neutral-600">{handle}</p>
                        </div>
                    </div>

                    <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex items-center gap-4 text-xs text-neutral-600 font-medium mb-4">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>{memberCount}</span>
                            </div>
                            {postCount && (
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>{postCount}</span>
                                </div>
                            )}
                        </div>

                        <button className="w-full py-2.5 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-xl font-medium text-sm transition-colors shadow-sm hover:shadow-md">
                            Join Community
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Default Variant (All Communities)
    return (
        <div className="bg-neutral-100 rounded-2xl p-5 border border-neutral-300 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
            <div className="flex mb-4">
                <div className={`w-12 h-12 rounded-2xl ${headerColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 text-neutral-100 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            <div className="mb-1">
                <h3 className="font-bold text-neutral-800 group-hover:text-primary-300 transition-colors">{name}</h3>
                <p className="text-xs text-neutral-600">{handle}</p>
            </div>

            <p className="text-sm text-neutral-600 mt-2 mb-4 line-clamp-2 flex-1 leading-relaxed">
                {description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-300">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-neutral-600 text-xs font-medium">
                        <Users className="w-3.5 h-3.5" />
                        <span>{memberCount}</span>
                    </div>
                    {tag && (
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${getTagColorClass()}`}>
                            {tag}
                        </span>
                    )}
                </div>

                <button className="px-6 py-1.5 rounded-lg bg-primary-300 text-neutral-100 text-sm font-medium hover:bg-primary-200 transition-all shadow-sm hover:shadow hover:px-7">
                    Join
                </button>
            </div>
        </div>
    );
}
