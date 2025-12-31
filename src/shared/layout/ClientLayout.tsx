'use client';

import { usePathname } from 'next/navigation';
import HomeHeader from './HomeHeader';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import BottomNav from './BottomNav';
import HomeLeftSidebar from '../../features/feed/components/HomeLeftSidebar';
import { AuthProvider } from '@/src/shared/context/AuthContext';
import LoginModal from '@/src/features/auth/components/LoginModal';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <AuthProvider>
            <LoginModal />
            {/* Show Header on Home, Live, and Messages */}
            {(isHome || pathname.includes('messages') || pathname.includes('live')) && <HomeHeader />}

            <div className="flex justify-center min-h-screen pb-14 sm:pb-0 ">
                <div className={`flex w-full gap-6  ${pathname.includes('live') || pathname.includes('messages') ? '' : 'max-w-[1265px] px-0'}`}>
                    {/* Left Sidebar Logic */}
                    {!pathname.includes('live') && !pathname.includes('messages') && (
                        /* Use Sidebar with Logo for Communities (Dashboard Layout) */
                        (pathname.includes('communities')) ? (
                            <Sidebar showLogo={true} fullHeight={true} />
                        ) : (
                            /* Home uses HomeLeftSidebar, others might use standard Sidebar */
                            isHome ? (
                                <HomeLeftSidebar />
                            ) : (
                                <Sidebar
                                    showLogo={true}
                                    fullHeight={true}
                                />
                            )
                        )
                    )}

                    <main className={`flex-1 min-h-screen flex flex-col pt-0 ${isHome || pathname.includes('communities')
                        ? ''
                        : ''
                        } ${isHome || pathname.includes('live') || pathname.includes('messages')
                            ? ''
                            : 'sm:ml-[275px]'
                        }`}>
                        {children}
                    </main>

                    {/* Right Sidebar Logic */}
                    {isHome && <RightSidebar />}
                </div>
                <BottomNav />
            </div>
        </AuthProvider>
    );
}
