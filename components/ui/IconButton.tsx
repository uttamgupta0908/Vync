import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    icon: LucideIcon;
    label?: string | number;
    onClick?: () => void;
    color?: 'default' | 'green' | 'pink' | 'indigo';
    size?: 'sm' | 'md';
    className?: string;
}

export default function IconButton({
    icon: Icon,
    label,
    onClick,
    color = 'default',
    size = 'sm',
    className = ''
}: IconButtonProps) {
    const colorClasses = {
        default: 'hover:text-[#8B5CF6] group-hover:bg-indigo-50',
        green: 'hover:text-green-500 group-hover:bg-green-50',
        pink: 'hover:text-pink-500 group-hover:bg-pink-50',
        indigo: 'hover:text-[#8B5CF6] group-hover:bg-indigo-50',
    };

    const iconSizes = {
        sm: 'w-[18px] h-[18px]',
        md: 'w-6 h-6',
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 group transition-colors ${className} ${color === 'default' ? 'text-gray-500' : ''} ${color === 'green' ? 'hover:text-green-500' : ''} ${color === 'pink' ? 'hover:text-pink-500' : ''} ${color === 'indigo' ? 'hover:text-[#8B5CF6]' : ''}`}
        >
            <div className={`p-2 rounded-full transition-colors ${colorClasses[color]}`}>
                <Icon className={iconSizes[size]} />
            </div>
            {label !== undefined && (
                <span className="text-xs">{label}</span>
            )}
        </button>
    );
}
