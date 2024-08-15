import { create } from 'zustand';

// Définir les types pour le state et les actions
interface BearState {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
	updateBears: (newBears: number) => void;
}

// Créer le store avec les types
export const useBearStore = create<BearState>(set => ({
	bears: 0,
	increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
	updateBears: (newBears: number) => set({ bears: newBears })
}));
