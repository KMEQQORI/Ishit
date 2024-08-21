'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useProductStore } from '@/store/product.store';
import { addProduct, monitorProducts } from '@/api/product.api';
import WithAuth from '@/components/hoc/withAuth';
import ProductCard from '@/app/products/ProductCard.component';
import ProductList from '@/app/products/ProductList.component';

function ProductPage() {
	const [name, setName] = useState<string>('');
	const [calories, setCalories] = useState<string>('');
	const [image, setImage] = useState<string>('');

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const handleCaloriesChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCalories(e.target.value);
	};
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		await addProduct(name, calories, image);
	};

	useEffect(() => {
		monitorProducts();
	}, []);

	return (
		<div className="flex flex-col justify-center">
			<div className="w-full bg-white rounded-b-md p-3 flex flex-col justify-center items-center">
				<input
					type="text"
					className="w-11/12 border-2 border-gray-700 rounded-md p-2 my-1"
					placeholder="nom"
					value={name}
					onChange={handleNameChange}
					required
				/>
				<input
					type="text"
					className="w-11/12 border-2 border-gray-700 rounded-md p-2 my-1"
					placeholder="nombre de calories"
					value={calories}
					onChange={handleCaloriesChange}
					required
				/>
				<input
					type="text"
					className="w-11/12 border-2 border-gray-700 rounded-md p-2 my-1"
					placeholder="url de l'image"
					value={image}
					onChange={handleImageChange}
					required
				/>
				<button
					className="w-11/12 border-2 border-green-600 bg-green-600 text-white rounded-md p-2 my-1"
					type="submit"
					onClick={handleSubmit}
				>
					add
				</button>
			</div>

			<ProductList isEdit />
		</div>
	);
}

export default WithAuth(ProductPage);
