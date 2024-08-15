import { create } from 'zustand';
import { ProductType, ProductList } from '@/types/product.type';

// Définir les types pour le state et les actions
interface UserState {
	products: ProductList | null;
	updateProducts: (products: ProductList) => void;
}

// Créer le store avec les types
export const useProductStore = create<UserState>(set => ({
	products: null,
	updateProducts: products => set(state => ({ products }))
}));
