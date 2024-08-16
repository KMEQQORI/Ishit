'use client';
import React, { useEffect } from 'react';
import { useProductStore } from '@/store/product.store';
import { monitorProducts } from '@/api/product.api';
import WithAuth from '@/components/hoc/withAuth';
import ProductCard from '@/app/products/ProductCard.component';

function ProductPage() {
	const products = useProductStore(state => state.products);

	useEffect(() => {
		monitorProducts();
	}, []);

	return (
		<div className="flex flex-col justify-center">
			<div className="w-full bg-white rounded-b-md p-3 flex flex-col justify-center items-center">
				<input type="text" className="w-11/12 border-2 border-gray-700 rounded-md p-2 my-1" placeholder="name" />
				<input type="text" className="w-11/12 border-2 border-gray-700 rounded-md p-2 my-1" placeholder="name" />
				<input type="text" className="w-11/12 border-2 border-gray-700 rounded-md p-2 my-1" placeholder="name" />
			</div>
			<div className="flex flex-col items-center justify-between">
				{Object.entries(products || {}).map(([id, product]) => (
					<ProductCard key={id} id={id} name={product.name} calories={product.calories} image={product.image} />
				))}
			</div>
		</div>
	);
}

export default WithAuth(ProductPage);
