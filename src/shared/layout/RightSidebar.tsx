'use client';

import { usePathname } from 'next/navigation';
import { users } from '@/src/shared/data/mock';
import { Avatar } from '@/src/shared/ui';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';
import { useAuth } from '@/src/features/auth/hooks/useAuth';

export default function RightSidebar() {
    const pathname = usePathname();
    const isDetailsPage = pathname.includes('/details/');
    const { user, isAuthenticated } = useAuth();
    const { openLoginModal } = useAuthUI();


    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            openLoginModal();
        }
    };

    if (isDetailsPage) {
        return null;
    }

    return (
        <div className="w-[350px] ml-[-24px] hidden lg:block space-y-6 py-6 sticky top-6 h-screen overflow-y-auto p-4">
            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm">
                <h2 className="text-base font-bold px-4 py-3 text-neutral-800 border-b border-neutral-200">Trending Hashtags</h2>

                {[
                    { tag: '#webdev', posts: '12.4k posts', trend: 'Trending' },
                    { tag: '#design', posts: '8.9k posts', trend: 'Trending' },
                    { tag: '#react', posts: '6.2k posts', trend: 'Hot' },
                    { tag: '#ai', posts: '15.7k posts', trend: 'Trending' },
                ].map((item, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-neutral-400 cursor-pointer transition-colors flex justify-between items-center">
                        <div>
                            <p className="font-bold text-neutral-800 text-sm">{item.tag}</p>
                            <p className="text-xs text-neutral-600 mt-0.5">{item.posts}</p>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.trend === 'Hot' ? 'bg-accent-300/20 text-accent-500' : 'bg-primary-100/10 text-primary-300'
                            }`}>
                            {item.trend}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm">
                <h2 className="text-base font-bold px-4 py-3 text-neutral-800 border-b border-neutral-200">Suggested for you</h2>

                {users.slice(1, 4).map((user) => (
                    <div key={user.id} className="px-4 py-3 hover:bg-neutral-400 cursor-pointer transition-colors flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Avatar src={user.avatar} alt={user.name} size="sm" className="w-9 h-9" />
                            <div className="min-w-0">
                                <p className="font-bold text-neutral-800 text-sm truncate">{user.name}</p>
                                <p className="text-xs text-neutral-600 truncate">{user.handle}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAction}
                            className="bg-primary-300 text-neutral-100 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary-200 transition-colors"
                        >
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm p-4">
                <h2 className="text-base font-bold text-neutral-800 mb-3">Live Rooms</h2>
                <div className="space-y-3">
                    {[
                        { name: 'Tech Talk', listening: 24, avatar: users[1].avatar },
                        { name: 'Design Chat', listening: 12, avatar: users[2].avatar }
                    ].map((room, i) => (
                        <div key={i} className="flex items-center justify-between hover:bg-neutral-400 cursor-pointer transition-colors p-2 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Avatar src={room.avatar} alt={room.name} size="sm" className="w-8 h-8" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-angry-500 border-2 border-neutral-100 rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-800">{room.name}</p>
                                    <p className="text-xs text-neutral-600">{room.listening} listening</p>
                                </div>
                            </div>
                            <button
                                onClick={handleAction}
                                className="px-3 py-1 bg-primary-100/10 text-primary-300 text-xs font-bold rounded-lg hover:bg-primary-100/20"
                            >
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}