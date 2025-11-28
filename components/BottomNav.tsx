'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, Mail, PenSquare } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Messages', href: '/messages', icon: Mail },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 sm:hidden z-50 pb-safe">
            <div className="flex justify-around items-center h-14">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="p-2 flex flex-col items-center justify-center w-full h-full"
                        >
                            <item.icon
                                className={`w-6 h-6 ${isActive ? 'text-gray-900 stroke-[2.5px]' : 'text-gray-500 stroke-2'}`}
                            />
                        </Link>
                    );
                })}
            </div>

            <button className="absolute -top-16 right-4 w-14 h-14 bg-indigo-500 rounded-full text-white shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <PenSquare className="w-6 h-6" />
            </button>
        </div>
    );
}
