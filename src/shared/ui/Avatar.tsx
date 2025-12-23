import React from 'react';

interface AvatarProps {
    src: string;
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
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-20 h-20',
        '2xl': 'w-32 h-32', // increased for premium header
    };

    const variantClasses = {
        circle: 'rounded-full',
        rounded: 'rounded-3xl',
    };

    return (
        <img
            src={src}
            alt={alt}
            className={`${variantClasses[variant]} bg-neutral-300 object-cover ${sizeClasses[size]} ${className}`}
        />
    );
}

