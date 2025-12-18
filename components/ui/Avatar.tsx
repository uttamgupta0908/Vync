import React from 'react';

interface AvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
}

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-20 h-20',
        '2xl': 'w-24 h-24',
    };

    return (
        <img
            src={src}
            alt={alt}
            className={`rounded-full bg-neutral-300 object-cover ${sizeClasses[size]} ${className}`}
        />
    );
}
