"use client";
import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Avatar } from '@/src/shared/ui';
import { currentUser } from '@/src/shared/data/mock';

export default function AppHeader() {
    return (
        <div className="h-20 bg-neutral-100 border-b border-neutral-300 flex items-center justify-between px-8 sticky top-0 z-30">
            {/* Search */}
            <div className="flex-1 max-w-2xl relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                <input
                    type="text"
                    placeholder="Search communities, posts, people..."
                    className="w-full bg-neutral-400 border-none rounded-xl py-3 pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-600 focus:ring-2 focus:ring-primary-300/20 transition-all font-medium"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 ml-4">
                <button className="relative p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 rounded-xl transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-angry-500 rounded-full border-2 border-neutral-100"></span>
                </button>

                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <Plus className="w-4 h-4" />
                    <span>Create Post</span>
                </button>

                <Avatar
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    size="sm"
                    className="border border-neutral-300"
                />
            </div>
        </div>
    );
}
