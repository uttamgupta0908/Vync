import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-6 overflow-x-auto pb-px no-scrollbar border-b border-neutral-300">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`
                        pb-4 text-[15px] font-medium whitespace-nowrap transition-colors relative
                        ${activeCategory === category
                            ? 'text-primary-300'
                            : 'text-neutral-600 hover:text-neutral-800'}
                    `}
                >
                    {category}
                    {activeCategory === category && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-300 rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
