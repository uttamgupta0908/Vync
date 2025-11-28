export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  isLiked?: boolean;
}
