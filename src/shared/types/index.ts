export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  location?: string;
  joinDate?: string;
  verified?: boolean;
  posts?: number;
  rewardPoints?: number;
}

export interface Post {
  id: string;
  author: User;
  title?: string;
  description?: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  isLiked?: boolean;
}
