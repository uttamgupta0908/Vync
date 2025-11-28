import Feed from "@/components/features/feed/Feed";

import { posts } from "@/data/mock";

export default function Home() {
    return (
        <div className="flex-1 min-h-screen flex flex-col">
            <Feed posts={posts} />
        </div>
    );
}
