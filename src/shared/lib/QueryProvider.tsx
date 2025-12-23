'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/src/shared/lib/query-client';
import { ReactNode } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

/**
 * React Query Provider
 * Wraps the app with QueryClientProvider for server state management
 */
export default function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools only in development */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}
