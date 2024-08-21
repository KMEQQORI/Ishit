import React, { useEffect } from 'react';
import CaloriesTag from '@/components/comuns/CaloriesTag.component';
import { useUserStore } from '@/store/user.store';
import { useProductStore } from '@/store/product.store';

function WeightCard({ nextStep }) {
	const selectedProduct = useProductStore(state => state.selectedProduct);

	return (
		<div className="flex flex-col w-11/12 items-center justify-center bg-gray-50">
			<img className="h-32 w-32 object-cover rounded-md" src={selectedProduct.image} alt="Image de la carte" />
			<h2 className="text-xl font-semibold text-gray-800 p-2">{selectedProduct.name}</h2>
			<CaloriesTag count={selectedProduct.calories} long />
		</div>
	);
}

export default WeightCard;
