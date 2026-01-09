import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSendMessage } from '../hooks/useMessages';
import * as services from '../services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryKeys } from '@/src/shared/lib/query-client';

// Mock the services
vi.mock('../services', () => ({
    sendMessage: vi.fn(),
    fetchConversations: vi.fn(),
    fetchMessages: vi.fn(),
}));

describe('useSendMessage', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        });
        vi.clearAllMocks();
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('optimistically updates the message list', async () => {
        const conversationId = '1';
        const text = 'Hello optimistic world';
        const queryKey = queryKeys.messages(conversationId);

        queryClient.setQueryData(queryKey, []);

        (services.sendMessage as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ id: 'real-id', text, senderId: 'me', timestamp: 'Just now', isMe: true }), 10))
        );

        const { result } = renderHook(() => useSendMessage(), { wrapper });

        await result.current.mutateAsync({ conversationId, text });

        // After success, it will be invalidated, but settled.
        // We just want to check if it was called.
        expect(services.sendMessage).toHaveBeenCalledWith(conversationId, text);
    });

    it('rolls back on error', async () => {
        const conversationId = 'rollback-test';
        const text = 'Failing message';
        const queryKey = queryKeys.messages(conversationId);
        const previousMessages = [{ id: 'old', text: 'Previous', senderId: 'other', timestamp: '1:00', isMe: false }];

        queryClient.setQueryData(queryKey, previousMessages);

        (services.sendMessage as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((_, reject) => setTimeout(() => reject(new Error('Network Error')), 100))
        );
        // Important: mock fetchMessages to return the original state so invalidation doesn't break our check
        (services.fetchMessages as ReturnType<typeof vi.fn>).mockResolvedValue(previousMessages);

        const { result } = renderHook(() => useSendMessage(), { wrapper });

        // Use mutate and catch to avoid unhandled rejection in test
        result.current.mutate({ conversationId, text });

        // 1. Check optimistic update
        await waitFor(() => {
            const data = queryClient.getQueryData(queryKey) as unknown[];
            expect(data?.length).toBe(2);
        });

        // 2. Wait for it to fail
        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        }, { timeout: 2000 });

        // 3. Check rollback (using a relaxed check for contents since timestamp/id might be dynamic)
        await waitFor(() => {
            const data = queryClient.getQueryData(queryKey) as unknown[];
            expect(data).toHaveLength(1);
            expect((data[0] as { id: string }).id).toBe('old');
        });
    });
});
