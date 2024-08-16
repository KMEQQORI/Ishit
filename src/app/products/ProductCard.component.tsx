import React, { useEffect } from 'react';
import { monitorProducts } from '@/api/product.api';
import CaloriesTag from '@/components/comuns/CaloriesTag.component';

function ProductCard({ id, name, calories, image }) {
	useEffect(() => {
		monitorProducts();
	}, []);

	return (
		<div className="max-w-sm w-11/12 bg-white shadow-md rounded-md m-4 flex flex-row justify-between items-center">
			<img className="h-24 w-3/12 object-cover rounded-md" src={image} alt="Image de la carte" />
			<h2 className="w-7/12 text-l font-semibold text-gray-800 p-2">{name}</h2>
			<CaloriesTag count={calories} />
		</div>
	);
}

export default ProductCard;
