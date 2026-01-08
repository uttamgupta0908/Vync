import React, { useState } from 'react';

interface AvatarProps {
    src?: string | null;
    alt: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    variant?: 'circle' | 'rounded';
    className?: string;
}

export default function Avatar({
    src,
    alt,
    size = 'md',
    variant = 'circle',
    className = ''
}: AvatarProps) {
    const [error, setError] = useState(false);

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-20 h-20 text-2xl',
        '2xl': 'w-32 h-32 text-4xl',
    };

    const variantClasses = {
        circle: 'rounded-full',
        rounded: 'rounded-3xl',
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const isImageValid = src && !error;

    return (
        <div
            className={`${variantClasses[variant]} bg-neutral-200 flex items-center justify-center overflow-hidden shrink-0 ${sizeClasses[size]} ${className}`}
            aria-label={`Avatar of ${alt}`}
            role="img"
        >
            {isImageValid ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                <span className="font-bold text-neutral-500 select-none">
                    {alt ? getInitials(alt) : '?'}
                </span>
            )}
        </div>
    );
}

