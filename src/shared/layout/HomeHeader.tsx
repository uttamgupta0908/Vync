'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, Plus, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { currentUser } from '@/src/shared/data/mock';
import { Avatar } from '@/src/shared/ui';
import { useAuth } from '@/src/shared/context/AuthContext';

export default function HomeHeader() {
    const { isAuthenticated, user, openLoginModal, logout } = useAuth();
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

    const handleProtectedAction = (e: React.MouseEvent) => {
        if (!isAuthenticated) {
            e.preventDefault();
            openLoginModal();
        }
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 bg-neutral-100 border-b border-neutral-300 z-50">
            <div className="max-w-[1265px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-300 rounded-lg flex items-center justify-center">
                            <span className="text-neutral-100 font-bold text-lg">V</span>
                        </div>
                        <span className="text-xl font-bold text-neutral-800 hidden sm:block">Vync</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">Home</Link>
                        <Link
                            href="/communities"
                            onClick={handleProtectedAction}
                            className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            Communities
                        </Link>
                        <Link
                            href="/live"
                            onClick={handleProtectedAction}
                            className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            Live
                        </Link>
                        <Link
                            href="/messages"
                            onClick={handleProtectedAction}
                            className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            Messages
                        </Link>
                    </nav>
                </div>

                {/* Center: Search */}
                <div className="flex-1 max-w-md hidden sm:block mx-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                            type="text"
                            placeholder="Search Vync..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300/20 focus:bg-neutral-100 transition-all"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        onClick={handleProtectedAction}
                        className="relative p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 rounded-full transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        {isAuthenticated && (
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-angry-500 rounded-full border-2 border-neutral-100"></span>
                        )}
                    </button>

                    <button
                        onClick={handleProtectedAction}
                        className="hidden sm:flex items-center gap-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 p-2 rounded-full transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>

                    {isAuthenticated ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-neutral-200 transition-colors border border-transparent hover:border-neutral-300"
                            >
                                <Avatar
                                    src={user?.avatar || currentUser.avatar}
                                    alt={user?.name || currentUser.name}
                                    className="w-8 h-8 sm:w-9 sm:h-9 border border-neutral-300"
                                />
                                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                                        <p className="font-bold text-neutral-800 truncate">{user?.name}</p>
                                        <p className="text-xs text-neutral-500 truncate">{user?.handle || '@user'}</p>
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
        </header>
    );
}
