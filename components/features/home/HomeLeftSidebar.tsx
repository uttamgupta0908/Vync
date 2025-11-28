import Link from 'next/link';
import { currentUser } from '@/data/mock';
import Avatar from '@/components/ui/Avatar';

export default function HomeLeftSidebar() {
    return (
        <aside className="w-[275px] hidden sm:flex flex-col gap-6 sticky top-20 h-fit">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
                <Avatar
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-20 h-20 mb-3"
                />
                <h2 className="text-lg font-bold text-gray-900">{currentUser.name}</h2>
                <p className="text-sm text-gray-500 mb-6">{currentUser.handle}</p>

                <div className="flex justify-between w-full border-t border-gray-50 pt-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">142</span>
                        <span className="text-xs text-gray-500">Posts</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">2.1k</span>
                        <span className="text-xs text-gray-500">Followers</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">890</span>
                        <span className="text-xs text-gray-500">Following</span>
                    </div>
                </div>
            </div>

            {/* Trending Communities */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-bold text-gray-900 mb-4 px-2">Trending Communities</h3>
                <div className="space-y-1">
                    {[
                        { name: 'r/WebDev', members: '45.2k', icon: 'bg-indigo-100 text-indigo-600' },
                        { name: 'r/Design', members: '32.8k', icon: 'bg-orange-100 text-orange-600' },
                        { name: 'r/Gaming', members: '128k', icon: 'bg-green-100 text-green-600' }
                    ].map((community) => (
                        <div key={community.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${community.icon}`}>
                                    &lt;/&gt;
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900 group-hover:text-[#8B5CF6] transition-colors">{community.name}</p>
                                    <p className="text-xs text-gray-500">{community.members} members</p>
                                </div>
                            </div>
                            <button className="text-xs font-bold text-[#8B5CF6] bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-[#8B5CF6] hover:text-white transition-colors">
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
