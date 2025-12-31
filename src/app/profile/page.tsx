'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/shared/context/AuthContext';
import ProfileContainer from '@/src/features/profile/components/ProfileContainer';
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

    return <ProfileContainer username="you" />;
}
