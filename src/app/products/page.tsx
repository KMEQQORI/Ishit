'use client';
import React, { useEffect } from 'react';
import { useProductStore } from '@/store/product.store';
import { monitorProducts } from '@/api/product.api';

export default function Products() {
	const products = useProductStore(state => state.products);

	useEffect(() => {
		monitorProducts();
	}, []);

	return (
		<div className="flex flex-col items-center justify-between">
			{Object.entries(products || {}).map(([id, product]) => (
				<div key={id} class="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden m-4">
					<img class="w-full h-48 object-cover" src={product.image} alt="Image de la carte" />
					<div class="p-4">
						<h2 class="text-xl font-semibold text-gray-800">{product.name}</h2>
						<p class="mt-2 text-3xl font-bold text-gray-900">{product.calories}</p>
					</div>
				</div>
			))}
		</div>
	);
}
