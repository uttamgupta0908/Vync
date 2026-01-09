import { z } from 'zod';
import { localGet, localPost, localDel } from '@/src/shared/lib/api-client';
import {
  Post,
  FeedResponse,
  PostSchema,
  FeedResponseSchema,
  Comment,
  CommentSchema,
  WhatsHappeningResponse,
  WhatsHappeningResponseSchema,
  LikeResponse,
  LikeResponseSchema,
  SaveResponse,
  SaveResponseSchema,
} from '@/src/shared/contracts/schemas';


export const fetchFeed = async ({ pageParam = 0 }: { pageParam?: number } = {}): Promise<FeedResponse> => {
  try {
    // Proxy: /api/feed/feeds/discovery -> Backend: /api/v1/feed/feeds/discovery
  const response = await localGet<FeedResponse>(
      '/api/feed/feeds/discovery',
      { offset: pageParam, limit: 20 }
    );

    console.log('[Feed Service Debug] fetchFeed response keys:', Object.keys(response || {}));
    
    // Validate response shape
    const validated = FeedResponseSchema.parse(response);
    return validated;
  } catch (error: unknown) {
    console.error('[Feed Service Debug] fetchFeed FAILED:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};

/**
 * Fetch "What's Happening" (Trending Hashtags)
 * Proxy: /api/feed/feeds/whats-happening -> Backend: /api/v1/feed/feeds/whats-happening/
 */
export const fetchWhatsHappening = async (): Promise<WhatsHappeningResponse> => {
  try {
    const response = await localGet<WhatsHappeningResponse>('/api/feed/feeds/whats-happening');
    const parsed = WhatsHappeningResponseSchema.parse(response);
    
    // Fallback if API returns empty (requested by user to show data)
    if (!parsed.trending_hashtags || parsed.trending_hashtags.length === 0) {
       // Only use this fallback if we have permission (implied by user request)
       // Importing mock data dynamically to avoid circular dependency issues if any
       const { mockTrendingHashtags } = await import('@/src/shared/data/__mocks__/data');
       return { 
           ...parsed,
           trending_hashtags: mockTrendingHashtags 
       };
    }
    return parsed;
  } catch (error: unknown) {
    // If unauthorized (guest), return empty structure instead of throwing
    // If unauthorized (guest), return mock data instead of empty structure
    if (
      (typeof error === 'object' && error !== null && 'response' in error && 
       (error as { response?: { status?: number } }).response?.status === 401) ||
      (typeof error === 'object' && error !== null && 'status' in error &&
       (error as { status?: number }).status === 401)
    ) {
       console.debug('[Feed Service] Guest user - returning mock trending hashtags');
       const { mockTrendingHashtags } = await import('@/src/shared/data/__mocks__/data');
       return { trending_hashtags: mockTrendingHashtags };
    }
    console.error('[Feed Service Debug] fetchWhatsHappening FAILED:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};


export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await localGet<Post>(`/api/feed/feeds/${id}`);
  return PostSchema.parse(response);
};

/**
 * Like a feed post
 * Proxy: /api/feed/feeds/${postId}/like -> Backend: /api/v1/feed/feeds/${postId}/like/
 */
export const likePost = async (postId: string): Promise<LikeResponse> => {
  const response = await localPost<LikeResponse>(`/api/feed/feeds/${postId}/like`);
  return LikeResponseSchema.parse(response);
};

/**
 * Unlike a feed post
 * Proxy: /api/feed/feeds/${postId}/like -> Backend: /api/v1/feed/feeds/${postId}/like/
 */
export const unlikePost = async (postId: string): Promise<void> => {
  // Assuming regular delete for unlike if it's not a toggle
  await localDel(`/api/feed/feeds/${postId}/like`);
};

/**
 * Save a feed post
 * Proxy: /api/feed/feeds/${postId}/save -> Backend: /api/v1/feed/feeds/${postId}/save/
 */
export const savePost = async (postId: string): Promise<SaveResponse> => {
  const response = await localPost<SaveResponse>(`/api/feed/feeds/${postId}/save`);
  return SaveResponseSchema.parse(response);
};

/**
 * Unsave a feed post
 */
export const unsavePost = async (postId: string): Promise<void> => {
  await localDel(`/api/feed/feeds/${postId}/save`);
};

/**
 * Fetch comments for a specific post
 * Proxy: /api/feed/posts/{postId}/comments -> Backend: /api/v1/feed/posts/{postId}/comments/
 */
export const fetchPostComments = async (postId: string): Promise<Comment[]> => {
  const response = await localGet<unknown>(`/api/feed/posts/${postId}/comments`);
  
  // Handle potentially wrapped response with type guard
  const responseAsRecord = response as Record<string, unknown>;
  const commentsData = responseAsRecord.results || (Array.isArray(response) ? response : []);
  
  return z.array(CommentSchema).parse(commentsData);
};
