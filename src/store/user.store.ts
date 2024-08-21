import { create } from 'zustand';
import { UserType } from '@/types/user.type';

export const LOGGING_IN = 'LOGGING_IN';
// Définir les types pour le state et les actions
interface UserState {
	user: UserType | string | null;
	logUser: (user: UserType | null) => void;
	logoutUser: () => void;
}

// Créer le store avec les types
export const useUserStore = create<UserState>(set => ({
	user: LOGGING_IN,
	logUser: user => set(state => ({ user: user })),
	logoutUser: () => set({ user: null })
}));
