'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import ProfileContainer from '@/src/features/profile/components/ProfileContainer';
import AppHeader from '@/src/shared/layout/AppHeader';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex-1 min-h-screen bg-neutral-400">
            <AppHeader />
            <ProfileContainer username="you" isMe={true} />
        </div>
    );
}
