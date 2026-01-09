import { Post, User } from "@/src/shared/types";

export const currentUser: User = {
  id: "u1",
  name: "John Doe",
  handle: "@johndoe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  followers: 1205,
  following: 890,
  bio: "Product Designer | Tech Enthusiast | Coffee Lover",
};

export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Sarah Smith",
    handle: "@sarahsmith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    followers: 5400,
    following: 120,
  },
  {
    id: "u3",
    name: "Tech Insider",
    handle: "@techinsider",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
    followers: 150000,
    following: 10,
  },
  {
    id: "u4",
    name: "Design Daily",
    handle: "@designdaily",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
    followers: 89000,
    following: 450,
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    author: users[1],
    content:
      "Just launched our new design system! 🚀 It has been a long journey but totally worth it. Check it out and let me know what you think. #design #system #uiux",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    timestamp: "2h",
    likes: 1240,
    comments: 45,
    reposts: 120,
    views: 15000,
    isLiked: false,
  },
  {
    id: "p2",
    author: users[2],
    content:
      "The future of AI is here. Are we ready for the changes it will bring to our daily workflows? 🤖\n\nRead the full article in the thread below 👇",
    timestamp: "4h",
    likes: 8500,
    comments: 320,
    reposts: 1500,
    views: 250000,
    isLiked: false,
  },
  {
    id: "p3",
    author: users[3],
    content:
      "Minimalism is not about having less. It is about making room for more of what matters.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80",
    timestamp: "6h",
    likes: 3400,
    comments: 89,
    reposts: 450,
    views: 89000,
    isLiked: false,
  },
  {
    id: "p4",
    author: users[0],
    content:
      "Working on a new React project this weekend. The ecosystem keeps evolving so fast! ⚛️",
    timestamp: "12h",
    likes: 56,
    comments: 12,
    reposts: 5,
    views: 1200,
    isLiked: false,
  },
  {
    id: "p5",
    author: users[1],
    content: "Coffee first, code later. ☕️",
    timestamp: "1d",
    likes: 890,
    comments: 34,
    reposts: 89,
    views: 12000,
    isLiked: false,
  },
];






