import { useQuery } from '@tanstack/react-query';
import { fetchLiveRooms, fetchLiveRoom } from '../services';
import { queryKeys } from '@/src/shared/lib/query-client';

/**
 * Hook to fetch all live rooms
 */
export function useLiveRooms() {
    return useQuery({
        queryKey: queryKeys.liveRooms,
        queryFn: fetchLiveRooms,
    });
}

/**
 * Hook to fetch a specific live room
 */
export function useLiveRoom(id: string | null) {
    return useQuery({
        queryKey: id ? queryKeys.liveRoom(id) : ['liveRoom', 'none'],
        queryFn: () => id ? fetchLiveRoom(id) : Promise.resolve(undefined),
        enabled: !!id,
    });
}
