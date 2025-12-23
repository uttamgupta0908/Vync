'use client';

import { useState } from 'react';

type TabType = 'Posts' | 'Media' | 'Liked' | 'Saved' | 'Archived';

interface ProfileTabsProps {
    onTabChange?: (tab: TabType) => void;
}

export default function ProfileTabs({ onTabChange }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('Posts');

    const tabs: TabType[] = ['Posts', 'Media', 'Liked', 'Saved', 'Archived'];

    const handleTabClick = (tab: TabType) => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    return (
        <div className="border-b border-neutral-300 mt-4">
            <div className="flex gap-8 overflow-x-auto scrollbar-none">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap px-1 ${activeTab === tab
                            ? 'text-primary-200'
                            : 'text-neutral-600 hover:text-neutral-800'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-200 rounded-t-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

