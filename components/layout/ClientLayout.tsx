'use client';

import { usePathname } from 'next/navigation';
import HomeHeader from './HomeHeader';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import BottomNav from './BottomNav';
import HomeLeftSidebar from '../features/home/HomeLeftSidebar';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            {isHome && <HomeHeader />}
            <div className="flex justify-center min-h-screen pb-14 sm:pb-0">
                <div className="flex w-full max-w-[1265px] gap-6 px-4 sm:px-0">
                    {isHome ? (
                        <HomeLeftSidebar />
                    ) : (
                        <Sidebar
                            showLogo={true}
                            fullHeight={true}
                        />
                    )}

                    <main className={`flex-1 min-h-screen flex border-x border-gray-100 pt-0 ${isHome ? '' : 'sm:ml-[275px]'
                        }`}>
                        {children}
                    </main>
                    <RightSidebar />
                </div>
                <BottomNav />
            </div>
        </>
    );
}
