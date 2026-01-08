import Link from 'next/link';
import { currentUser } from '@/src/shared/data/mock';
import { Avatar } from '@/src/shared/ui';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { useTrendingCommunities, useToggleJoinCommunity } from '@/src/features/communities/hooks/useCommunities';
import { Users, ArrowRight, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomeLeftSidebar() {
    // const { isAuthenticated, user, openLoginModal } = useAuthUI();
    const { user, isAuthenticated, isLoading } = useAuth();
    const { openLoginModal } = useAuthUI();

    const { data: trendingData, isLoading: isTrendingLoading } = useTrendingCommunities();
    const { mutate: toggleJoin, isPending: isJoining } = useToggleJoinCommunity();
    const trendingCommunities = trendingData?.trending_communities?.slice(0, 3);

    const handleJoin = (e: React.MouseEvent, communityId: string, isJoined: boolean) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            openLoginModal();
            return;
        }

        toggleJoin({ communityId, isJoined }, {
            onSuccess: () => {
                toast.success(isJoined ? 'Left community' : 'Joined community!');
            }
        });
    };

    const formatCount = (value?: number | null) => {
        if (value == null) return '0'
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
        if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`
        return value.toString()
    }

    return (

        <aside className="w-[230px] hidden sm:flex flex-col gap-4 sticky top-16 h-fit left-4 pt-6">
            {/* Profile Card or Guest Card */}
            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 p-5">
                {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-neutral-200 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-neutral-200 rounded w-24" />
                                <div className="h-3 bg-neutral-200 rounded w-16" />
                            </div>
                        </div>
                        <div className="flex justify-around pt-3 border-t border-neutral-200">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="h-4 bg-neutral-200 rounded w-8" />
                                    <div className="h-3 bg-neutral-200 rounded w-10" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : isAuthenticated ? (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar
                                src={user?.avatar_url || currentUser.avatar_url || ''}
                                alt={user?.full_name || currentUser.full_name || 'User'}
                                className="w-16 h-16"
                            />
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base font-bold text-neutral-800 truncate">{user?.full_name || currentUser.full_name}</h2>
                                <p className="text-xs text-neutral-600 truncate">@{user?.username || currentUser.username}</p>
                            </div>
                        </div>

                        <div className="flex justify-around w-full pt-3 border-t border-neutral-200">
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-neutral-800 text-base">  {formatCount(user?.posts_count)}</span>
                                <span className="text-xs text-neutral-500">Posts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-neutral-800 text-base">{formatCount(user?.followers_count)}</span>
                                <span className="text-xs text-neutral-500">Followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-neutral-800 text-base">{formatCount(user?.following_count)}</span>
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
            <div className="bg-neutral-100 rounded-2xl border border-neutral-300 shadow-sm p-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-neutral-800 text-sm">Trending Communities</h3>

                </div>

                <div className="flex flex-col gap-5">
                    {isTrendingLoading ? (
                        // Skeleton Loading
                        [1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-3 animate-pulse">
                                <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-neutral-200 rounded w-24" />
                                    <div className="h-3 bg-neutral-200 rounded w-16" />
                                </div>
                            </div>
                        ))
                    ) : trendingCommunities?.map((community) => (
                        <div key={community.id} className="group  flex items-center justify-between">
                            <Link
                                href={`/communities/${community.slug || community.id}`}
                                className="flex items-center gap-3 mb-2.5"
                            >
                                <img
                                    src={community.image || community.cover || `https://ui-avatars.com/api/?name=${encodeURIComponent(community.name)}&background=random`}
                                    alt={community.name}
                                    className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform border border-neutral-200"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-sm text-neutral-800 truncate">
                                        {community.name}
                                    </span>
                                    <span className="text-[11px] text-neutral-500 truncate">
                                        {formatCount(community.followers_count || community.members)} members
                                    </span>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => handleJoin(e, community.id, !!community.isJoined)}
                                disabled={isJoining}
                                className={`ml-3 w-16 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${community.isJoined
                                    ? 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                                    : 'bg-primary-300 text-neutral-100 hover:bg-primary-200 shadow-sm hover:shadow'
                                    }`}
                            >
                                {community.isJoined ? 'Joined' : 'Join'}
                            </button>
                        </div>
                    ))}

                    {!isTrendingLoading && (!trendingCommunities || trendingCommunities.length === 0) && (
                        <p className="text-xs text-neutral-500 text-center py-2">No trending communities yet.</p>
                    )}
                </div>

                {!isTrendingLoading && trendingCommunities && trendingCommunities.length > 0 && (

                    <Link
                        href="/communities"
                        onClick={(e) => {
                            if (!isAuthenticated) {
                                e.preventDefault();
                                openLoginModal();
                            }
                        }}
                        className=" mt-3 pt-3 border-t border-neutral-200 flex items-center justify-center gap-2 text-[12px] font-bold tracking-widest text-neutral-800 hover:text-neutral-600 transition-colors group
  ">
                        <span>View All</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                )}
            </div>
        </aside>
    );
}

