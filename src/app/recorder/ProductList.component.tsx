'use client';
import React, { useEffect } from 'react';
import { useProductStore } from '@/store/product.store';
import { monitorProducts } from '@/api/product.api';
import WithAuth from '@/components/hoc/withAuth';
import ProductCard from '@/app/products/ProductCard.component';
import { useUserStore } from '@/store/user.store';

function ProductList({ isEdit, nextStep }) {
	const products = useProductStore(state => state.products);
	const selectProduct = useProductStore(state => state.selectProduct);

	useEffect(() => {
		monitorProducts();
	}, []);

	function handleProductSelection(product) {
		selectProduct(product);
		nextStep();
	}

	return (
		<div className="w-full flex flex-col items-center justify-between">
			<p className="text-gray-600 m-4">Please select a product</p>
			<input type="text" className="w-11/12 border-gray-400 border-2 p-2 rounded-md" placeholder="find a product" />
			{Object.entries(products || {}).map(([id, product]) => (
				<ProductCard
					key={id}
					id={id}
					name={product.name}
					calories={product.calories}
					image={product.image}
					isEdit={isEdit}
					selectProduct={() => handleProductSelection(product)}
				/>
			))}
		</div>
	);
}

export default WithAuth(ProductList);
