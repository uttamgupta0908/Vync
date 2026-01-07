import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AllCommunitiesSection from '../components/AllCommunitiesSection';
import { Community } from '../services';

const mockCommunities: any[] = [
    {
        id: '1',
        name: 'r/WebDev',
        description: 'A community for developers.',
        members: 1000,
        category: 'Gaming',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        creator: { id: 'u1', username: 'creator1' }
    },
    {
        id: '2',
        name: 'r/Design',
        description: 'A community for designers.',
        members: 2000,
        category: 'Food',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        creator: { id: 'u2', username: 'creator2' }
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
