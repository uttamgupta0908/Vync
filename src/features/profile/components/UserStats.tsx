interface UserStatsProps {
    posts: number;
    followers: number;
    following: number;
    rewardPoints: number;
}

export default function UserStats({ posts, followers, following, rewardPoints }: UserStatsProps) {
    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const stats = [
        { label: 'Posts', value: posts },
        { label: 'Followers', value: followers },
        { label: 'Following', value: following },
        { label: 'Reward Points', value: rewardPoints },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-neutral-100 rounded-xl p-6 shadow-sm border border-neutral-300/50 hover:border-primary-200/30 transition-all group flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-black text-primary-200 mb-2 truncate w-full">
                        {formatNumber(stat.value)}
                    </div>
                    <div className="text-sm font-bold text-neutral-600 uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

