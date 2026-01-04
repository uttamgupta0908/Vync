'use client';

import { Toaster } from 'react-hot-toast';

/**
 * Toast Provider
 * Wraps the app to enable toast notifications
 */
export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                // Default options
                duration: 4000,
                style: {
                    background: '#fff',
                    color: '#1f2937',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                // Success
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                    },
                },
                // Error
                error: {
                    duration: 5000,
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
                // Loading
                loading: {
                    iconTheme: {
                        primary: '#6366f1',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
}
