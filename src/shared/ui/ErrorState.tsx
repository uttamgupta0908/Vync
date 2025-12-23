import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    message?: string;
    retry?: () => void;
    className?: string;
}

export default function ErrorState({
    message = 'Something went wrong. Please try again.',
    retry,
    className = ''
}: ErrorStateProps) {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
            <div className="bg-neutral-100 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-accent-200/10 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-accent-200" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-800 mb-2">Oops!</h3>
                <p className="text-neutral-600 mb-6">{message}</p>

                {retry && (
                    <button
                        onClick={retry}
                        className="px-6 py-3 bg-primary-200 hover:bg-primary-100 text-neutral-100 rounded-full font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export function EmptyState({ message = 'No items found', className = '' }: { message?: string; className?: string }) {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
            <div className="text-center">
                <p className="text-neutral-600 text-lg">{message}</p>
            </div>
        </div>
    );
}
