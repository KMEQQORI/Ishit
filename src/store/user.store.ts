import { create } from 'zustand';
import { UserType } from '@/types/user.type';

// Définir les types pour le state et les actions
interface UserState {
	user: UserType | null;
	logUser: (user: UserType | null) => void;
	logoutUser: () => void;
}

// Créer le store avec les types
export const useUserStore = create<UserState>(set => ({
	user: null,
	logUser: user => set(state => ({ user: user })),
	logoutUser: () => set({ user: null })
}));
