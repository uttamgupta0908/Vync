'use client';

import ProfileContainer from '@/src/features/profile/components/ProfileContainer';

import AppHeader from '@/src/shared/layout/AppHeader';
import React from 'react';

interface PageProps {
    params: Promise<{
        username: string;
    }>;
}

export default function ProfilePage({ params }: PageProps) {
    // Unwrap params - Next.js 15+ async params
    const [username, setUsername] = React.useState<string | null>(null);

    React.useEffect(() => {
        params.then(p => setUsername(p.username));
    }, [params]);

    if (!username) {
        return (
            <div className="flex-1 min-h-screen bg-neutral-400 p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-neutral-600">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-screen bg-neutral-400">
            <AppHeader />

            <ProfileContainer username={username} isMe={false} />
        </div>
    );
}

