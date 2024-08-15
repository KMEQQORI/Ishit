import { create } from 'zustand';
import { Product, ProductList } from '@/types/product';
import { fetchProducts } from '@/api/product.api';

// Définir les types pour le state et les actions
interface UserState {
	products: ProductList;
	addProduct: (product: Product) => Product;
	updateProducts: (products: ProductList) => void;
}

// Créer le store avec les types
export const useProductStore = create<UserState>(set => ({
	products: null,
	updateProducts: products => set(state => ({ products }))
}));
