import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchConversations, fetchMessages, sendMessage, Message } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';

/**
 * Hook to fetch all conversations
 */
export function useConversations() {
    return useQuery({
        queryKey: queryKeys.conversations,
        queryFn: fetchConversations,
    });
}

/**
 * Hook to fetch messages for a specific conversation
 */
export function useMessages(conversationId: string | null) {
    return useQuery({
        queryKey: queryKeys.messages(conversationId as string),
        queryFn: () => conversationId ? fetchMessages(conversationId) : Promise.resolve([]),
        enabled: !!conversationId,
    });
}

/**
 * Hook to send a message with optimistic update
 */
export function useSendMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ conversationId, text }: { conversationId: string; text: string }) => 
            sendMessage(conversationId, text),
        
        onMutate: async ({ conversationId, text }) => {
            const queryKey = queryKeys.messages(conversationId);
            await queryClient.cancelQueries({ queryKey });

            const previousMessages = queryClient.getQueryData<Message[]>(queryKey);

            if (previousMessages) {
                const optimisticMessage: Message = {
                    id: 'temp-' + Date.now(),
                    senderId: 'me',
                    text,
                    timestamp: 'Sending...',
                    isMe: true,
                };
                queryClient.setQueryData<Message[]>(queryKey, [...previousMessages, optimisticMessage]);
            }

            return { previousMessages, conversationId };
        },

        onError: (err, variables, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(
                    queryKeys.messages(context.conversationId), 
                    context.previousMessages
                );
            }
        },

        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.messages(variables.conversationId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
        },
    });
}
