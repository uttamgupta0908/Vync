"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, Plus, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Avatar } from '@/src/shared/ui';
import { currentUser } from '@/src/shared/data/mock';
import { useAuth, useLogout } from '@/src/features/auth/hooks/useAuth';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';

export default function AppHeader() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { openLoginModal } = useAuthUI();
    const { mutate: logout } = useLogout();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProtectedAction = () => {
        if (!isAuthenticated) {
            openLoginModal();
        }
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

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
                <button
                    onClick={handleProtectedAction}
                    className="relative p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 rounded-xl transition-all"
                >
                    <Bell className="w-5 h-5" />
                    {isAuthenticated && (
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-angry-500 rounded-full border-2 border-neutral-100"></span>
                    )}
                </button>

                <button
                    onClick={handleProtectedAction}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Post</span>
                </button>

                {isLoading ? (
                    <div className="w-9 h-9 bg-neutral-300 rounded-full animate-pulse" />
                ) : isAuthenticated ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-neutral-200 transition-colors border border-transparent hover:border-neutral-300"
                        >
                            <Avatar
                                src={user?.avatar_url || currentUser.avatar_url || ''}
                                alt={user?.full_name || currentUser.full_name || 'User'}
                                size="sm"
                                className="border border-neutral-300"
                            />
                            <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                                    <p className="font-bold text-neutral-800 truncate">{user?.full_name}</p>
                                    <p className="text-xs text-neutral-500 truncate">@{user?.username || 'user'}</p>
                                </div>

                                <div className="p-2">
                                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                </div>

                                <div className="p-2 border-t border-neutral-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-angry-500 hover:bg-angry-50 rounded-xl transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={openLoginModal}
                        className="px-5 py-2 bg-primary-300 hover:bg-primary-200 text-neutral-100 font-bold rounded-xl text-sm transition-colors shadow-lg shadow-primary-300/20"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
}
