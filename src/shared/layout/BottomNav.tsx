'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, Mail, PenSquare } from 'lucide-react';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';
import { useAuth } from '@/src/features/auth/hooks/useAuth';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Messages', href: '/messages', icon: Mail },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const { openLoginModal } = useAuthUI();


    const handleAction = (e: React.MouseEvent, isProtected: boolean) => {
        if (isProtected && !isAuthenticated) {
            e.preventDefault();
            openLoginModal();
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-100 border-t border-neutral-300 sm:hidden z-50 pb-safe">
            <div className="flex justify-around items-center h-14">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isProtected = ['/messages', '/notifications'].includes(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleAction(e, isProtected)}
                            className="p-2 flex flex-col items-center justify-center w-full h-full"
                        >
                            <item.icon
                                className={`w-6 h-6 ${isActive ? 'text-neutral-800 stroke-[2.5px]' : 'text-neutral-600 stroke-2'}`}
                            />
                        </Link>
                    );
                })}
            </div>

            <button
                onClick={(e) => handleAction(e, true)}
                className="absolute -top-16 right-4 w-14 h-14 bg-primary-300 rounded-full text-neutral-100 shadow-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
            >
                <PenSquare className="w-6 h-6" />
            </button>
        </div>
    );
}
