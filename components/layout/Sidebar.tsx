'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Users, MessageSquare, Bell, Bookmark, Trophy } from 'lucide-react';
import { currentUser } from '@/data/mock';
import Avatar from '@/components/ui/Avatar';

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

    return (
        <aside className={`w-[275px] fixed left-0 hidden sm:flex flex-col border-r border-gray-100 bg-white z-40 ${fullHeight ? 'h-screen top-0' : 'h-[calc(100vh-64px)] top-16'
            }`}>
            {showLogo && (
                <div className="px-8 py-6">
                    <h1 className="text-2xl font-bold text-[#8B5CF6]">Vync</h1>
                </div>
            )}

            {/* Scrollable Navigation */}
            <nav className={`flex-1 overflow-y-auto scrollbar-thin px-4 space-y-1 ${showLogo ? 'pb-4' : 'py-4'}`}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-indigo-200'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-2' : 'stroke-[1.5px] group-hover:stroke-2'}`} />
                                <span className={`font-medium text-[15px] ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                            </div>
                            {item.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#EF4444] text-white'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 mt-6 border-t border-gray-50">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Your Communities</p>
                    <div className="space-y-1">
                        {['Design Hub', 'Tech Talk', 'Fitness Journey', 'Gaming Zone'].map((community) => (
                            <Link key={community} href="#" className="block px-4 py-2.5 text-[15px] font-medium text-gray-600 hover:text-[#8B5CF6] hover:bg-gray-50 rounded-lg transition-colors">
                                {community}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>




            {/* Fixed Footer */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-gray-50 transition-colors text-left group">
                    <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        size="md"
                        className="ring-2 ring-transparent group-hover:ring-[#8B5CF6]/20 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate group-hover:text-[#8B5CF6] transition-colors">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 truncate">{currentUser.handle}</p>
                    </div>
                </button>
            </div>
        </aside>
    );
}
