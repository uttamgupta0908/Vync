import { describe, it, expect } from 'vitest';
import { FeedResponseSchema } from '../schemas';

describe('Schema Validation', () => {
    it('should validate the discovery feed response correctly', () => {
        const mockResponse = {
            "results": [
                {
                    "id": "2b919457-466c-4e5f-88dd-084e1b9cca99",
                    "title": "Give me my money back quickly #mrkhiyalica",
                    "content": "",
                    "type": "video",
                    "category": "other",
                    "tags": [],
                    "topics": [],
                    "likes": 1,
                    "comments": 0,
                    "views": 3733,
                    "shares": 0,
                    "saves": 0,
                    "reposts": 0,
                    "quotes": 0,
                    "visibility": "public",
                    "nsfw": false,
                    "is_user_anonymous": false,
                    "allow_comments": false,
                    "allow_reposts": false,
                    "allow_shares": false,
                    "allow_mentions": false,
                    "created_at": "2025-12-16T14:18:10.171231Z",
                    "updated_at": "2025-12-16T14:18:10.171248Z",
                    "user": {
                        "id": "b41829df-193f-4c2d-8496-246b40c50173",
                        "username": "mrkhiyalica",
                        "full_name": "Mr.Khiyalica",
                        "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocK0IEOTdni0MmRoGa5FUwynYS6A52snKjcz9wKaSLlvCd2cPw=s96-c",
                        "is_verified": true,
                        "verification_badges": []
                    },
                    "community": null,
                    "media": [
                        {
                            "id": "203c12cb-a7d6-4c2f-bf05-4bca921b9681",
                            "type": "video",
                            "url": "https://dev-cdn.vync.live/media/uploads/video/b41829df-193f-4c2d-8496-246b40c50173/563ed1d0-0161-46a9-a4db-d660707dc68f.mp4",
                            "thumbnail_url": "https://dev-cdn.vync.live/media/thumbnails/image/b41829df-193f-4c2d-8496-246b40c50173/256bc5e9-0b1e-4847-833a-eb16be945f56.jpg",
                            "width": 576,
                            "height": 1024,
                            "order": 0,
                            "alt_text": null
                        }
                    ],
                    "has_media": true,
                    "poll": null,
                    "location": null,
                    "has_liked": false,
                    "is_saved": false,
                    "score": 1,
                    "strategy": "two_tower_vector_search"
                }
            ],
            "pagination": {
                "limit": 20,
                "offset": 40,
                "count": 20,
                "has_more": true
            }
        };

        const result = FeedResponseSchema.safeParse(mockResponse);
        
        if (!result.success) {
            console.error('Schema validation failed:', JSON.stringify(result.error.format(), null, 2));
        }
        
        expect(result.success).toBe(true);
    });
});
