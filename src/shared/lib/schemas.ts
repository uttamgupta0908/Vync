import { z } from 'zod';

/**
 * Shared schemas for Vync
 * These act as source of truth for API contracts.
 */

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  members: z.number(),
  image: z.string().optional(),
  category: z.string(),
  isJoined: z.boolean().optional(),
});

export const PostSchema = z.object({
  id: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    avatar: z.string().optional(),
  }),
  content: z.string(),
  image: z.string().optional(),
  likes: z.number(),
  comments: z.number(),
  timestamp: z.string(),
  isLiked: z.boolean().optional(),
});

export const MessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  isMe: z.boolean(),
});

export const ConversationSchema = z.object({
  id: z.string(),
  userName: z.string(),
  userAvatar: z.string(),
  lastMessage: z.string(),
  timestamp: z.string(),
  unreadCount: z.number(),
  online: z.boolean().optional(),
});

export type Community = z.infer<typeof CommunitySchema>;
export type Post = z.infer<typeof PostSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
