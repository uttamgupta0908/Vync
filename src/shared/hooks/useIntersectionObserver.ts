import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    enabled?: boolean;
    onIntersect?: () => void;
}

export function useIntersectionObserver({
    threshold = 0,
    root = null,
    rootMargin = '0px',
    enabled = true,
    onIntersect,
}: UseIntersectionObserverProps = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || !enabled) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                const isVisible = entry.isIntersecting;
                setIsIntersecting(isVisible);

                if (isVisible && onIntersect) {
                    onIntersect();
                }
            },
            {
                threshold,
                root,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, enabled, onIntersect]);

    return { ref, isIntersecting };
}
