'use client';

import { Search, Bell } from 'lucide-react';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';
import { Avatar } from '@/src/shared/ui';

export default function Header() {
    const { user, isAuthenticated } = useAuth();
    const { openLoginModal } = useAuthUI();

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 ml-64">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects, tasks..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
                    <Bell className="w-5 h-5" />
                    {isAuthenticated && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                {isAuthenticated ? (
                    <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
                        <Avatar
                            src={user?.avatar || ''}
                            alt={user?.name || 'User'}
                            className="w-8 h-8"
                        />
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.handle}</p>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={openLoginModal}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
