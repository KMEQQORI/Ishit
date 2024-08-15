import { create } from 'zustand';

// Définir les types pour le state et les actions
interface UserState {
	user: unknown;
	logUser: (user: unknown) => void;
	logoutUser: () => void;
}

// Créer le store avec les types
export const useUserStore = create<UserState>(set => ({
	user: null,
	logUser: user => set(state => ({ user: user })),
	logoutUser: () => set({ user: null })
}));
