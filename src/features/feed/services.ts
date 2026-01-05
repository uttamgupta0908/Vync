import { z } from 'zod';
import { get, post, del, localGet } from '@/src/shared/lib/api-client';
import {
  Post,
  FeedResponse,
  PostSchema,
  FeedResponseSchema,
  Comment,
  CommentSchema,
} from '@/src/shared/contracts/schemas';


export const fetchFeed = async ({ pageParam = 0 }: { pageParam?: number } = {}): Promise<FeedResponse> => {
  // Proxy: /api/feed/feeds/discovery -> Backend: /api/v1/feed/feeds/discovery
  const response = await localGet<FeedResponse>(
    '/api/feed/feeds/discovery',
    { offset: pageParam, limit: 20 }
  );

  return FeedResponseSchema.parse(response);
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await get<Post>(
    `/api/v1/feed/feeds/${id}/`
  );

  return PostSchema.parse(response);
};

export const likePost = async (postId: string): Promise<void> => {
  await post(`/api/v1/feed/posts/${postId}/like`);
};

export const unlikePost = async (postId: string): Promise<void> => {
  await del(`/api/v1/feed/posts/${postId}/like`);
};

/**
 * Fetch comments for a specific post
 * GET /api/v1/feed/posts/{postId}/comments/
 */
export const fetchPostComments = async (postId: string): Promise<Comment[]> => {
  const response = await get<any>(`/api/v1/feed/posts/${postId}/comments/`);
  
  // Handle potentially wrapped response
  const commentsData = response.results || (Array.isArray(response) ? response : []);
  
  return z.array(CommentSchema).parse(commentsData);
};
