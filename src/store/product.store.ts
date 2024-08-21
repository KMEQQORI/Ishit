import { create } from 'zustand';
import { ProductList, ProductType } from '@/types/product.type';

// Définir les types pour le state et les actions
interface ProductState {
	selectedProduct: ProductType;
	products: ProductList | null;
	updateProducts: (products: ProductList) => void;
	selectProduct: (selectedProduct: ProductType) => void;
}

// Créer le store avec les types
export const useProductStore = create<ProductState>(set => ({
	products: null,
	updateProducts: products => set(state => ({ products })),
	selectProduct: selectedProduct => set(state => ({ selectedProduct }))
}));
