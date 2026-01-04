'use client';

import { useUserProfile, useUserPosts } from '../hooks/useProfile';
import { ProfileSkeleton } from '@/src/shared/ui/LoadingSkeleton';
import ErrorState from '@/src/shared/ui/ErrorState';
import UserProfileHeader from './UserProfileHeader';
import UserStats from './UserStats';
import ProfileTabs from './ProfileTabs';
import ProfilePostsGrid from './ProfilePostsGrid';

interface ProfileContainerProps {
    username: string;
    isMe: boolean;
}

export default function ProfileContainer({ username, isMe }: ProfileContainerProps) {
    const {
        data: user,
        isLoading: userLoading,
        error: userError,
        refetch: refetchUser
    } = useUserProfile(username);

    const {
        data: posts,
        isLoading: postsLoading,
        error: postsError
    } = useUserPosts(username);

    if (userLoading) return <ProfileSkeleton />;

    if (userError) {
        return (
            <ErrorState
                message="Failed to load user profile. Please try again."
                retry={() => refetchUser()}
            />
        );
    }

    if (!user) {
        return <ErrorState message="User not found." />;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <UserProfileHeader user={user} isMe={isMe} />

            <div className="px-8 space-y-8">
                {/* Stats Section */}
                <UserStats
                    posts={user.posts_count || 0}
                    followers={user.followers_count || 0}
                    following={user.following_count || 0}
                    rewardPoints={user.rewardPoints || 0}
                />

                {/* Tabs & Content */}
                <div className="space-y-6">
                    <ProfileTabs />

                    {postsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-neutral-100 rounded-3xl h-64 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : postsError ? (
                        <div className="text-center p-8 text-neutral-600">
                            Failed to load posts
                        </div>
                    ) : (
                        <ProfilePostsGrid posts={posts || []} />
                    )}
                </div>
            </div>
        </div>
    );
}
