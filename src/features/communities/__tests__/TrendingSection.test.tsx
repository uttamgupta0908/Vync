import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TrendingSection from '../components/TrendingSection';

describe('TrendingSection', () => {
    it('renders trending communities correctly', () => {
        render(<TrendingSection />);

        expect(screen.getByText('Trending Communities')).toBeDefined();
        expect(screen.getByText('Design Hub')).toBeDefined();
        expect(screen.getByText('Tech Talk')).toBeDefined();
        expect(screen.getByText('Fitness Journey')).toBeDefined();
    });

    it('renders the correct badges', () => {
        render(<TrendingSection />);
        expect(screen.getByText('Trending')).toBeDefined();
        expect(screen.getByText('Hot')).toBeDefined();
        expect(screen.getByText('Active')).toBeDefined();
    });
});
