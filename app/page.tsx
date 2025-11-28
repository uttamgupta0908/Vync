import Feed from "@/components/Feed";
import HomeHeader from "@/components/HomeHeader";
import { posts } from "@/data/mock";

export default function Home() {
    return (
        <div className="flex-1 min-h-screen flex flex-col">
            <HomeHeader />
            <Feed posts={posts} />
        </div>
    );
}
