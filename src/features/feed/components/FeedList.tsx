import { Post } from '@/src/shared/types';
import PostCard from './PostCard';

interface FeedListProps {
    posts: Post[];
}

/**
 * Feed List (Presentational Component)
 * Pure UI component that just displays the list of posts
 */
export default function FeedList({ posts }: FeedListProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
