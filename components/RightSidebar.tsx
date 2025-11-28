'use client';

import { usePathname } from 'next/navigation';
import { users } from '@/data/mock';

export default function RightSidebar() {
    const pathname = usePathname();
    const isDetailsPage = pathname.includes('/details/');

    if (isDetailsPage) {
        return null;
    }

    return (
        <div className="w-[350px] ml-8 hidden lg:block space-y-6 py-6 sticky top-0 h-screen overflow-y-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-base font-bold px-4 py-3 text-gray-900 border-b border-gray-50">Trending Hashtags</h2>

                {[
                    { tag: '#webdev', posts: '12.4k posts', trend: 'Trending' },
                    { tag: '#design', posts: '8.9k posts', trend: 'Trending' },
                    { tag: '#react', posts: '6.2k posts', trend: 'Hot' },
                    { tag: '#ai', posts: '15.7k posts', trend: 'Trending' },
                ].map((item, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{item.tag}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.posts}</p>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.trend === 'Hot' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-50 text-indigo-600'
                            }`}>
                            {item.trend}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-base font-bold px-4 py-3 text-gray-900 border-b border-gray-50">Suggested for you</h2>

                {users.slice(1, 4).map((user) => (
                    <div key={user.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full bg-gray-200 object-cover" />
                            <div className="min-w-0">
                                <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.handle}</p>
                            </div>
                        </div>
                        <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors">
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">Live Rooms</h2>
                <div className="space-y-3">
                    {[
                        { name: 'Tech Talk', listening: 24, avatar: users[1].avatar },
                        { name: 'Design Chat', listening: 12, avatar: users[2].avatar }
                    ].map((room, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={room.avatar} className="w-8 h-8 rounded-full" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{room.name}</p>
                                    <p className="text-xs text-gray-500">{room.listening} listening</p>
                                </div>
                            </div>
                            <button className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-200">
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}