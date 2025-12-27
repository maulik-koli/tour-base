"use client"
import React from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { showToast } from '@/lib/showToat';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            showToast.error(error?.message || 'Something went wrong');
        },
    }),

    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                if (error?.status >= 400 && error?.status < 500) {
                    return false;
                }
                return failureCount < 2;
            },
        },
        mutations: {
            retry: false,
        },
    },
});


const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider
