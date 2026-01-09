import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFeed } from '../hooks/useFeed';
import * as services from '../services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Mock the services
vi.mock('../services', () => ({
    fetchFeed: vi.fn(),
    fetchPostById: vi.fn(),
    fetchPostComments: vi.fn(),
    likePost: vi.fn(),
    unlikePost: vi.fn(),
    fetchWhatsHappening: vi.fn(),
}));

describe('useFeed', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
            },
        });
        vi.clearAllMocks();
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('fetches the first page of the feed', async () => {
        const mockData = {
            results: [{ id: '1', content: 'Test Post' }],
            count: 1,
            next: null,
            previous: null,
            generated_at: new Date().toISOString()
        };

        (services.fetchFeed as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

        const { result } = renderHook(() => useFeed(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data?.pages[0]).toEqual(mockData);
        expect(services.fetchFeed).toHaveBeenCalledWith(expect.objectContaining({ pageParam: 0 }));
    });

    it('fetches the next page when fetchNextPage is called', async () => {
        const page1 = {
            results: Array(20).fill({ id: '1', content: 'Post 1' }),
            count: 40,
            next: 'some-url',
            previous: null,
            generated_at: new Date().toISOString()
        };
        const page2 = {
            results: [{ id: '21', content: 'Post 21' }],
            count: 40,
            next: null,
            previous: 'some-url',
            generated_at: new Date().toISOString()
        };

        (services.fetchFeed as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce(page1)
            .mockResolvedValueOnce(page2);

        const { result } = renderHook(() => useFeed(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        // Fetch next page
        result.current.fetchNextPage();

        await waitFor(() => expect(result.current.isFetchingNextPage).toBe(false));
        await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));

        expect(services.fetchFeed).toHaveBeenNthCalledWith(1, expect.objectContaining({ pageParam: 0 }));
        expect(services.fetchFeed).toHaveBeenNthCalledWith(2, expect.objectContaining({ pageParam: 20 }));
    });
});
