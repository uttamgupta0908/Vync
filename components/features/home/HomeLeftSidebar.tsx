import Link from 'next/link';
import { currentUser } from '@/data/mock';
import Avatar from '@/components/ui/Avatar';

export default function HomeLeftSidebar() {
    return (
        <aside className="w-[230px] hidden sm:flex flex-col gap-4 sticky top-20 h-fit left-4">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] h-16"></div>
                <div className="px-5 pb-5 -mt-10 flex flex-col items-center text-center">
                    <div className="ring-4 ring-white rounded-full mb-3">
                        <Avatar
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-20 h-20"
                        />
                    </div>
                    <h2 className="text-base font-bold text-gray-900">{currentUser.name}</h2>
                    <p className="text-xs text-gray-500 mb-4">{currentUser.handle}</p>

                    <div className="flex justify-around w-full bg-white rounded-xl p-3 shadow-sm border border-gray-50">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-sm">142</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Posts</span>
                        </div>
                        <div className="w-px bg-gray-100"></div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-sm">2.1k</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Followers</span>
                        </div>
                        <div className="w-px bg-gray-100"></div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-sm">890</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Communities */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-4 hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Trending Communities</h3>
                <div className="space-y-2">
                    {[
                        { name: 'r/WebDev', members: '45.2k', icon: '💻', color: 'from-indigo-500 to-purple-500' },
                        { name: 'r/Design', members: '32.8k', icon: '🎨', color: 'from-orange-500 to-pink-500' },
                        { name: 'r/Gaming', members: '128k', icon: '🎮', color: 'from-green-500 to-teal-500' }
                    ].map((community) => (
                        <div key={community.name} className="flex items-center justify-between p-2 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 rounded-xl transition-all duration-200 cursor-pointer group">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${community.color} flex items-center justify-center text-white text-base shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                                    {community.icon}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-xs text-gray-900 group-hover:text-[#8B5CF6] transition-colors truncate">{community.name}</p>
                                    <p className="text-[10px] text-gray-500">{community.members} members</p>
                                </div>
                            </div>
                            <button className="text-[10px] font-bold text-[#8B5CF6] bg-indigo-50 px-2.5 py-1 rounded-full hover:bg-[#8B5CF6] hover:text-white hover:shadow-md transition-all duration-200 flex-shrink-0">
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
