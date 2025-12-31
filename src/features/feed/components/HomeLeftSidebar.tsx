import Link from 'next/link';
import { currentUser } from '@/src/shared/data/mock';
import { Avatar } from '@/src/shared/ui';
import { useAuth } from '@/src/shared/context/AuthContext';

export default function HomeLeftSidebar() {
    const { isAuthenticated, user, openLoginModal } = useAuth();

    const handleJoinClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            openLoginModal();
        }
    };

    return (
        <aside className="w-[230px] hidden sm:flex flex-col gap-4 sticky top-16 h-fit left-4 pt-6">
            {/* Profile Card or Guest Card */}
            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 p-5">
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar
                                src={user?.avatar || currentUser.avatar}
                                alt={user?.name || currentUser.name}
                                className="w-16 h-16"
                            />
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base font-bold text-neutral-800 truncate">{user?.name || currentUser.name}</h2>
                                <p className="text-xs text-neutral-600 truncate">{user?.handle || currentUser.handle}</p>
                            </div>
                        </div>

                        <div className="flex justify-around w-full pt-3 border-t border-neutral-200">
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-neutral-800 text-base">142</span>
                                <span className="text-xs text-neutral-500">Posts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-neutral-800 text-base">2.1k</span>
                                <span className="text-xs text-neutral-500">Followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-neutral-800 text-base">890</span>
                                <span className="text-xs text-neutral-500">Following</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-neutral-800 mb-2">New to Vync?</h2>
                        <p className="text-xs text-neutral-600 mb-4">Sign up now to get your own personalized timeline!</p>
                        <button
                            onClick={openLoginModal}
                            className="w-full bg-neutral-900 text-white font-bold py-2 rounded-xl hover:bg-neutral-800 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>

            {/* Trending Communities */}
            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-bold text-neutral-800 mb-3 text-sm">Trending Communities</h3>
                <div className="space-y-2">
                    {[
                        { name: 'r/WebDev', members: '45.2k', icon: '💻', color: 'from-primary-100 to-primary-300' },
                        { name: 'r/Design', members: '32.8k', icon: '🎨', color: 'from-accent-500 to-primary-400' },
                        { name: 'r/Gaming', members: '128k', icon: '🎮', color: 'from-success-500 to-success-400' }
                    ].map((community) => (
                        <div key={community.name} className="flex items-center justify-between p-2 hover:bg-gradient-to-r hover:from-primary-100/10 hover:to-primary-300/10 rounded-xl transition-all duration-200 cursor-pointer group">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${community.color} flex items-center justify-center text-neutral-100 text-base shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                                    {community.icon}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-xs text-neutral-800 group-hover:text-primary-300 transition-colors truncate">{community.name}</p>
                                    <p className="text-[10px] text-neutral-600">{community.members} members</p>
                                </div>
                            </div>
                            <button
                                onClick={handleJoinClick}
                                className="text-[10px] font-bold text-primary-300 bg-primary-100/10 px-2.5 py-1 rounded-xl hover:bg-primary-300 hover:text-neutral-100 hover:shadow-md transition-all duration-200 flex-shrink-0"
                            >
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
