interface LoadingSkeletonProps {
    count?: number;
    className?: string;
}

export default function LoadingSkeleton({ count = 3, className = '' }: LoadingSkeletonProps) {
    return (
        <div className={`space-y-4 ${className}`}>
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
        <div className="space-y-6 animate-pulse">
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
