'use client';

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    rightSidebar: React.ReactNode;
    bottomNav: React.ReactNode;
}

export default function LayoutWrapper({
    children,
    sidebar,
    rightSidebar,
    bottomNav,
}: LayoutWrapperProps) {
    const pathname = usePathname();
    const isDetails = pathname.includes('/details/');

    return (
        <div className={`flex min-h-screen pb-14 sm:pb-0 ${isDetails ? '' : 'justify-center'}`}>
            <div className={`flex w-full ${isDetails ? '' : 'max-w-[1265px]'}`}>
                {sidebar}
                <main className={`flex-1 sm:ml-[275px] min-h-screen flex flex-col ${isDetails ? 'border-l border-neutral-300' : 'border-x border-neutral-300'}`}>
                    {children}
                </main>
                {rightSidebar}
            </div>
            {bottomNav}
        </div>
    );
}
