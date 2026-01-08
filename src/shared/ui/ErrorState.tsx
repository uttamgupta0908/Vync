import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';

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
            <div className="bg-neutral-50 rounded-2xl p-8 max-w-md w-full text-center border border-neutral-200">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-angry-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-angry-500" aria-hidden="true" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-800 mb-2">Oops!</h3>
                <p className="text-neutral-600 mb-6" aria-live="assertive">{message}</p>

                {retry && (
                    <button
                        onClick={retry}
                        className="px-6 py-3 bg-primary-300 hover:bg-primary-200 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 mx-auto shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export function EmptyState({
    message = 'No items found',
    description,
    className = ''
}: {
    message?: string;
    description?: string;
    className?: string
}) {
    return (
        <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-neutral-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800">{message}</h3>
            {description && (
                <p className="text-neutral-500 mt-1 max-w-xs mx-auto">{description}</p>
            )}
        </div>
    );
}
