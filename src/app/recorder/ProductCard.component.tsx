import React, { useEffect } from 'react';
import { deleteProduct, monitorProducts } from '@/api/product.api';
import CaloriesTag from '@/components/comuns/CaloriesTag.component';
import toast from 'react-hot-toast';

function ProductCard({ id, name, calories, image, isEdit, selectProduct }) {
	async function handleDeleteProduct() {
		toast.promise(deleteProduct(id), {
			loading: 'Saving...',
			success: <b className="text-red-500">product deleted</b>,
			error: <b>Could not delete Product.</b>
		});
	}

	return (
		<div className="relative max-w-sm w-11/12 bg-white shadow-md rounded-md m-4 flex flex-row justify-between items-center">
			{isEdit && (
				<button
					className="absolute -bottom-2 -right-2 p-2 text-white font-bold rounded-full bg-red-800"
					onClick={handleDeleteProduct} // Ajoutez la fonction de suppression ici
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5 0V4a2 2 0 012-2h2a2 2 0 012 2v3M4 7h16"
						/>
					</svg>
				</button>
			)}
			{!isEdit && (
				<button
					className="absolute -bottom-4 p-2 text-white font-bold rounded-full bg-yellow-500"
					onClick={selectProduct} // Ajoutez la fonction de suppression ici
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
					</svg>
				</button>
			)}
			<img className="h-24 w-3/12 object-cover rounded-md" src={image} alt="Image de la carte" />
			<h2 className="w-5/12 text-l font-semibold text-gray-800 p-2">{name}</h2>
			<CaloriesTag count={calories} long={false} />
		</div>
	);
}

export default ProductCard;
