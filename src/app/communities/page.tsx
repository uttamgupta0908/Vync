import { CommunitiesContainer } from '@/src/features/communities';
import AppHeader from '@/src/shared/layout/AppHeader';

export default function CommunitiesPage() {
    return (
        <div className="min-h-screen bg-neutral-400 text-neutral-800 w-full">
            <AppHeader />
            <CommunitiesContainer />
        </div>
    );
}

