import { Loader2 } from 'lucide-react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    return (
        <Loader2
            className={`animate-spin ${sizeClasses[size]} ${className}`}
        />
    );
}

export function InlineSpinner({ size = 'sm' }: { size?: 'sm' | 'md' }) {
    return (
        <div className="flex items-center justify-center">
            <Spinner size={size} className="text-primary-200" />
        </div>
    );
}
