'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Users, MessageSquare, Bell, Bookmark, Trophy } from 'lucide-react';
import { currentUser } from '@/src/shared/data/mock';
import { Avatar } from '@/src/shared/ui';
import { useAuth } from '@/src/shared/context/AuthContext';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Messages', href: '/messages', icon: MessageSquare, badge: 3 },
    { name: 'Notifications', href: '/notifications', icon: Bell, badge: 12 },
    { name: 'Saved', href: '/saved', icon: Bookmark },
    { name: 'Rewards', href: '/rewards', icon: Trophy },
];

interface SidebarProps {
    showLogo?: boolean;
    fullHeight?: boolean;
}

export default function Sidebar({ showLogo = false, fullHeight = false }: SidebarProps) {
    const pathname = usePathname();
    const { isAuthenticated, openLoginModal } = useAuth();

    return (
        <aside className={`w-[275px] fixed left-0 hidden sm:flex flex-col border-r border-neutral-300 bg-neutral-100 z-40 ${fullHeight ? 'h-screen top-0' : 'h-[calc(100vh-64px)] top-16'
            }`}>
            {showLogo && (
                <div className="px-8 py-6 border-b border-neutral-300">
                    <h1 className="text-2xl font-bold text-primary-300">Vync</h1>
                </div>
            )}

            {/* Scrollable Navigation */}
            <nav className={`flex-1 overflow-y-auto scrollbar-thin px-4 space-y-1 ${showLogo ? 'pb-4' : 'py-4'}`}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isProtected = ['/messages', '/notifications', '/communities', '/saved', '/rewards'].includes(item.href);

                    const handleClick = (e: React.MouseEvent) => {
                        if (isProtected && !isAuthenticated) {
                            e.preventDefault();
                            openLoginModal();
                        }
                    };

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={handleClick}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-primary-300 text-neutral-100 shadow-lg shadow-primary-300/20'
                                : 'text-neutral-600 hover:bg-neutral-300 hover:text-neutral-800'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-2' : 'stroke-[1.5px] group-hover:stroke-2'}`} />
                                <span className={`font-medium text-[15px] ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                            </div>
                            {item.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-neutral-100/20 text-neutral-100' : 'bg-angry-500 text-neutral-100'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 mt-6 border-t border-neutral-300">
                    <p className="px-4 text-xs font-bold text-neutral-600 uppercase tracking-wider mb-4">Your Communities</p>
                    <div className="space-y-1">
                        {['Design Hub', 'Tech Talk', 'Fitness Journey', 'Gaming Zone'].map((community) => (
                            <Link key={community} href="#" className="block px-4 py-2.5 text-[15px] font-medium text-neutral-600 hover:text-primary-300 hover:bg-neutral-300 rounded-lg transition-colors">
                                {community}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>




            {/* Fixed Footer */}
            <div className="p-4 border-t border-neutral-300">
                <button className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-neutral-300 transition-colors text-left group">
                    <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        size="md"
                        className="ring-2 ring-transparent group-hover:ring-primary-300/20 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-neutral-800 text-sm truncate group-hover:text-primary-300 transition-colors">{currentUser.name}</p>
                        <p className="text-xs text-neutral-600 truncate">{currentUser.handle}</p>
                    </div>
                </button>
            </div>
        </aside>
    );
}
