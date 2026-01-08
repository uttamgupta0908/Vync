import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    icon: LucideIcon;
    label?: string | number;
    ariaLabel?: string;
    onClick?: (e: React.MouseEvent) => void;
    color?: 'default' | 'green' | 'pink' | 'indigo';
    size?: 'sm' | 'md';
    className?: string;
    disabled?: boolean;
}

export default function IconButton({
    icon: Icon,
    label,
    ariaLabel,
    onClick,
    color = 'default',
    size = 'sm',
    className = '',
    disabled = false
}: IconButtonProps) {
    const colorClasses = {
        default: 'hover:text-primary-300 group-hover:bg-primary-100/10',
        green: 'hover:text-success-500 group-hover:bg-success-100',
        pink: 'hover:text-angry-500 group-hover:bg-angry-100',
        indigo: 'hover:text-primary-300 group-hover:bg-primary-100/10',
    };

    const iconSizes = {
        sm: 'w-[18px] h-[18px]',
        md: 'w-6 h-6',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
            className={`flex items-center gap-2 group transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className} ${color === 'default' ? 'text-neutral-500' : ''} ${color === 'green' ? 'hover:text-success-500' : ''} ${color === 'pink' ? 'hover:text-angry-500' : ''} ${color === 'indigo' ? 'hover:text-primary-300' : ''}`}
        >
            <div className={`p-2 rounded-full transition-colors ${colorClasses[color]}`}>
                <Icon className={iconSizes[size]} />
            </div>
            {label !== undefined && (
                <span className="text-xs font-medium">{label}</span>
            )}
        </button>
    );
}
