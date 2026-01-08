
interface LoadingSkeletonProps {
    count?: number;
    className?: string;
}

export default function LoadingSkeleton({ count = 3, className = '' }: LoadingSkeletonProps) {
    return (
        <div
            className={`space-y-4 ${className}`}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-neutral-100 rounded-2xl p-4 shadow-sm animate-pulse">
                    <div className="flex gap-3">
                        {/* Avatar skeleton */}
                        <div className="w-10 h-10 bg-neutral-300 rounded-full flex-shrink-0"></div>

                        <div className="flex-1 space-y-3">
                            {/* Header skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 bg-neutral-300 rounded w-1/4"></div>
                                <div className="h-3 bg-neutral-300 rounded w-1/3"></div>
                            </div>

                            {/* Content skeleton */}
                            <div className="space-y-2">
                                <div className="h-3 bg-neutral-300 rounded w-full"></div>
                                <div className="h-3 bg-neutral-300 rounded w-5/6"></div>
                            </div>

                            {/* Image skeleton (optional) */}
                            {i % 2 === 0 && (
                                <div className="h-48 bg-neutral-300 rounded-xl mt-3"></div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FeedSkeleton() {
    return <LoadingSkeleton count={5} />;
}

export function ProfileSkeleton() {
    return (
        <div
            className="space-y-6 animate-pulse"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            {/* Header skeleton */}
            <div className="bg-neutral-100 rounded-2xl overflow-hidden">
                <div className="h-48 bg-neutral-300"></div>
                <div className="px-6 pb-6">
                    <div className="w-24 h-24 bg-neutral-300 rounded-full -mt-12 mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-6 bg-neutral-300 rounded w-1/4"></div>
                        <div className="h-4 bg-neutral-300 rounded w-1/3"></div>
                        <div className="h-4 bg-neutral-300 rounded w-2/3 mt-4"></div>
                    </div>
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="bg-neutral-100 rounded-2xl p-6">
                <div className="grid grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="text-center space-y-2">
                            <div className="h-8 bg-neutral-300 rounded w-16 mx-auto"></div>
                            <div className="h-4 bg-neutral-300 rounded w-20 mx-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CommunitySkeleton({ variant = 'default' }: { variant?: 'default' | 'trending' }) {
    if (variant === 'trending') {
        return (
            <div className="bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-300 flex flex-col h-full animate-pulse">
                {/* Header with color */}
                <div className="h-24 bg-neutral-300 relative">
                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center p-1 shadow-sm">
                        <div className="w-full h-full rounded-xl bg-neutral-400" />
                    </div>
                </div>

                <div className="pt-8 px-6 pb-6 flex-1 flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 bg-neutral-400 rounded w-1/2" />
                            <div className="h-4 bg-neutral-300 rounded w-16" />
                        </div>
                        <div className="h-3 bg-neutral-300 rounded w-1/4" />
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="h-4 bg-neutral-300 rounded w-full" />
                        <div className="h-4 bg-neutral-300 rounded w-5/6" />
                        <div className="h-4 bg-neutral-300 rounded w-4/6" />
                    </div>

                    <div className="mt-auto">
                        <div className="flex gap-4 mb-4">
                            <div className="h-3 bg-neutral-300 rounded w-12" />
                            <div className="h-3 bg-neutral-300 rounded w-12" />
                        </div>
                        <div className="w-full h-10 bg-neutral-300 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Default Variant (mimics All Communities card)
    return (
        <div className="bg-neutral-100 rounded-2xl p-5 border border-neutral-300 h-full flex flex-col animate-pulse">
            <div className="flex mb-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-300 shrink-0" />
            </div>

            <div className="mb-4">
                <div className="h-5 bg-neutral-400 rounded w-2/3 mb-2" />
                <div className="h-3 bg-neutral-300 rounded w-1/3" />
            </div>

            <div className="space-y-2 flex-1 mb-4">
                <div className="h-3 bg-neutral-300 rounded w-full" />
                <div className="h-3 bg-neutral-300 rounded w-5/6" />
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200">
                <div className="h-4 bg-neutral-300 rounded w-16" />
                <div className="h-8 bg-neutral-300 rounded-lg w-20" />
            </div>
        </div>
    );
}

export function MessageSkeleton() {
    return (
        <div className="space-y-4 p-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                        <div className="flex justify-between">
                            <div className="h-4 bg-neutral-300 rounded w-1/3" />
                            <div className="h-3 bg-neutral-200 rounded w-12" />
                        </div>
                        <div className="h-3 bg-neutral-200 rounded w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function LiveRoomSkeleton() {
    return (
        <div className="space-y-1 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-neutral-100 rounded-xl p-3">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-300 shrink-0" />
                        <div className="flex-1 space-y-2 py-0.5">
                            <div className="flex justify-between">
                                <div className="h-4 bg-neutral-300 rounded w-2/3" />
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <div className="h-3 bg-neutral-200 rounded w-1/3" />
                                <div className="h-4 bg-neutral-200 rounded w-10" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function PostDetailSkeleton() {
    return (
        <div className="flex-1 min-h-screen flex flex-col pb-20 sm:pb-0 bg-neutral-100 animate-pulse">
            <div className="h-16 border-b border-neutral-300 w-full bg-white mb-6" />
            <div className="px-14 p-6 space-y-4">
                {/* Main Post Card Skeleton */}
                <div className="bg-neutral-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-neutral-300 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-3">
                            <div className="h-4 bg-neutral-300 rounded w-1/4" />
                            <div className="space-y-2">
                                <div className="h-3 bg-neutral-300 rounded w-full" />
                                <div className="h-3 bg-neutral-300 rounded w-full" />
                                <div className="h-3 bg-neutral-300 rounded w-2/3" />
                            </div>
                            <div className="h-64 bg-neutral-300 rounded-xl mt-3" />
                        </div>
                    </div>
                </div>

                {/* Reply Input Skeleton */}
                <div className="bg-neutral-100 rounded-2xl h-24 p-4 shadow-sm" />

                {/* Comments Skeleton */}
                <div className="bg-neutral-100 rounded-2xl shadow-sm p-4 space-y-4">
                    <div className="h-6 bg-neutral-200 rounded w-32 mb-4" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-10 h-10 bg-neutral-200 rounded-full flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-neutral-200 rounded w-1/4" />
                                <div className="h-3 bg-neutral-200 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
