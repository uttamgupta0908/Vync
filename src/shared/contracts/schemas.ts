import { z } from 'zod';

// Verification Badge Schema
export const VerificationBadgeSchema = z.object({
    id: z.string().optional(), // API response does not include id
    name: z.string(),
    icon: z.string(),
    badge_type: z.string(),
    description: z.string().optional(),
    color: z.string().optional(), // Often present in badge APIs
    awarded_at: z.string(),
});

// User Schema - matches Vync API
export const UserSchema = z.object({
    id: z.coerce.string(),
    username: z.string(),
    email: z.string().email().nullable().optional(),
    full_name: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    
    // Avatar fields
    avatar_url: z.string().nullable().optional(),
    display_avatar_url: z.string().nullable().optional(),
    avatar: z.object({
        id: z.string().optional(),
        original_filename: z.string().optional(),
        display_url: z.string().optional(),
        upload_status: z.string().optional()
    }).nullable().optional(),

    // Profile details
    location: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    created_at: z.string().nullable().optional(), // Maps to joinedDate in UI
    
    // Status flags
    is_verified: z.boolean().optional(),
    is_private: z.boolean().optional(),
    show_mature_content: z.boolean().optional(),
    require_follow_approval: z.boolean().optional(),
    login_method: z.string().optional(),
    
    // Social graph status for the viewer
    is_followed: z.boolean().optional(),
    is_blocked: z.boolean().optional(),
    is_following: z.boolean().optional(),

    // Counts
    followers_count: z.number().optional(),
    following_count: z.number().optional(),
    posts_count: z.number().optional(),
    
    // Legacy/UI specific optional fields (keeping for backward compatibility if needed)
    followers: z.number().nullable().optional(),
    following: z.number().nullable().optional(),
    posts: z.number().nullable().optional(),
    joinDate: z.string().nullable().optional(), // Can map from created_at
    rewardPoints: z.number().nullable().optional(),
    
    verification_badges: z.array(VerificationBadgeSchema).optional(),
});

// Media Schema
export const MediaSchema = z.object({
    id: z.coerce.string(),
    type: z.enum(['video', 'image']),
    url: z.string().url(),
    thumbnail_url: z.string().url().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    order: z.number().optional(),
    alt_text: z.string().nullable().optional(),
});

// Community Schema
// Community Schema
export const CommunitySchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    members: z.number().optional().default(0), // Used in list views
    followers_count: z.number().optional().default(0), // API uses this for trending
    image: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    slug: z.string().optional(),
    isJoined: z.boolean().optional().default(false),
    creator: z.object({
        id: z.string(),
        username: z.string(),
    }).nullable().optional(),
});

// Trending Community Schema (includes sample members)
export const TrendingCommunitySchema = CommunitySchema.extend({
    sample_members: z.array(UserSchema).optional(),
});

// Trending Communities Response Schema
export const TrendingCommunitiesResponseSchema = z.preprocess(
    (val) => {
        if (Array.isArray(val)) {
            return { trending_communities: val };
        }
        return val;
    },
    z.object({
        trending_communities: z.array(TrendingCommunitySchema).nullable().transform(val => val ?? []).default([]),
        generated_at: z.string().nullable().optional(),
    })
);


// Community Details Schema (as seen in Feed Post)
export const CommunityDetailsSchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    slug: z.string(),
});

// Post Schema - matches Vync API
export const PostSchema = z.object({
    id: z.coerce.string(),
    title: z.string().nullable().optional(),
    content: z.string(),
    summary: z.string().nullable().optional(),
    type: z.enum(['video', 'image', 'text']).optional(),
    category: z.string().nullable().optional(),
    tags: z.array(z.string()).nullable().optional(),
    topics: z.array(z.string()).nullable().optional(),
    likes: z.number().default(0),
    comments: z.number().default(0),
    views: z.number().default(0),
    shares: z.number().optional(),
    saves: z.number().optional(),
    reposts: z.number().optional(),
    quotes: z.number().optional(),
    visibility: z.string().optional(),
    nsfw: z.boolean().optional(),
    is_user_anonymous: z.boolean().optional(),
    allow_comments: z.boolean().optional(),
    allow_reposts: z.boolean().optional(),
    allow_shares: z.boolean().optional(),
    allow_mentions: z.boolean().optional(),
    created_at: z.string(),
    updated_at: z.string().optional(),
    user: UserSchema,
    media: z.array(MediaSchema).optional(),
    has_media: z.boolean().optional(),
    has_liked: z.boolean().default(false),
    is_saved: z.boolean().optional(),
    community: z.any().nullable().optional(),
    community_details: CommunityDetailsSchema.nullable().optional(),
    poll: z.any().nullable().optional(),
    location: z.any().nullable().optional(),
    parent_feed: z.any().nullable().optional(),
    score: z.number().optional(),
    strategy: z.string().optional(),
});

// Feed Response Schema
export const FeedResponseSchema = z.object({
    results: z.array(PostSchema).nullable().transform(val => val ?? []).default([]),
    pagination: z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
        count: z.number().default(0),
        has_more: z.boolean().default(false),
    }).optional().default({
        limit: 20,
        offset: 0,
        count: 0,
        has_more: false,
    }),
});

// Message Schema
export const MessageSchema = z.object({
    id: z.coerce.string(),
    senderId: z.coerce.string(),
    text: z.string(),
    timestamp: z.string(),
    isMe: z.boolean(),
});

// Conversation Schema
export const ConversationSchema = z.object({
    id: z.coerce.string(),
    userName: z.string(),
    userAvatar: z.string(),
    lastMessage: z.string(),
    timestamp: z.string(),
    unreadCount: z.number(),
    online: z.boolean().optional(),
});

// Comment Schema
export const CommentSchema = z.object({
    id: z.coerce.string(),
    content: z.string(),
    created_at: z.string(),
    likes: z.number().default(0),
    user: UserSchema,
    parent_comment: z.coerce.string().nullable().optional(),
    replies_count: z.number().default(0),
});

// Profile Schemas
// UserProfileSchema is redundant as UserSchema now contains all fields
// export const UserProfileSchema = UserSchema; 

export const UserPostsResponseSchema = z.array(PostSchema);

// Auth Schemas
export const LoginResponseSchema = z.object({
    access: z.string(),      // API Returns 'access'
    refresh: z.string(),     // API Returns 'refresh'
    user: UserSchema,
});

export const CurrentUserResponseSchema = z.object({
    user: UserSchema.nullable(),
});

// Hashtag Schema
export const TrendingHashtagSchema = z.object({
    hashtag: z.string(),
    usage_count: z.number().default(0),
    last_used: z.string().nullable().optional(),
    total_engagement: z.number().default(0),
    trending_score: z.number().default(0),
});

// Whats Happening Response Schema
export const WhatsHappeningResponseSchema = z.preprocess(
    (val) => {
        if (Array.isArray(val)) {
            return { trending_hashtags: val };
        }
        return val;
    },
    z.object({
        trending_hashtags: z.array(TrendingHashtagSchema).nullable().transform(val => val ?? []).default([]),
        generated_at: z.string().nullable().optional(),
    })
);


// Error Schema
export const ApiErrorSchema = z.object({
    error: z.string(),
    code: z.string().optional(),
    details: z.unknown().optional(),
});

// Engagement Response Schemas
export const LikeResponseSchema = z.object({
    detail: z.string(),
    likes: z.number(),
    has_liked: z.boolean(),
});

export const SaveResponseSchema = z.object({
    detail: z.string(),
    saves: z.number(),
    is_saved: z.boolean(),
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type FeedResponse = z.infer<typeof FeedResponseSchema>;
export type Community = z.infer<typeof CommunitySchema>;
export type TrendingCommunity = z.infer<typeof TrendingCommunitySchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type TrendingHashtag = z.infer<typeof TrendingHashtagSchema>;
export type WhatsHappeningResponse = z.infer<typeof WhatsHappeningResponseSchema>;
export type TrendingCommunitiesResponse = z.infer<typeof TrendingCommunitiesResponseSchema>;
export type LikeResponse = z.infer<typeof LikeResponseSchema>;
export type SaveResponse = z.infer<typeof SaveResponseSchema>;


