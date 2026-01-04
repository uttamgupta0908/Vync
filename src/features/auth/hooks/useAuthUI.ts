import { create } from 'zustand';

interface AuthUIState {
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

/**
 * UI state for auth modals
 * Separate from server state (user data)
 */
export const useAuthUI = create<AuthUIState>((set) => ({
    isLoginModalOpen: false,
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
