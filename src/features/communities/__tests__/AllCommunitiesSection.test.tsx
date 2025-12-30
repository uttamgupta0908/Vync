import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AllCommunitiesSection from '../components/AllCommunitiesSection';
import { Community } from '../services';

const mockCommunities: Community[] = [
    {
        id: '1',
        name: 'r/WebDev',
        description: 'A community for developers.',
        members: 1000,
        category: 'Gaming',
    },
    {
        id: '2',
        name: 'r/Design',
        description: 'A community for designers.',
        members: 2000,
        category: 'Food',
    },
];

describe('AllCommunitiesSection', () => {
    it('renders correctly with communities', () => {
        render(<AllCommunitiesSection communities={mockCommunities} />);

        expect(screen.getByText('All Communities')).toBeDefined();
        expect(screen.getByText('r/WebDev')).toBeDefined();
        expect(screen.getByText('r/Design')).toBeDefined();
    });

    it('renders the correct number of community cards', () => {
        render(<AllCommunitiesSection communities={mockCommunities} />);
        const cards = screen.getAllByRole('heading', { level: 3 });
        expect(cards).toHaveLength(2);
    });
});
