import { onValue, push, ref, set } from '@firebase/database';
import { database } from '@/lib/firebase';
import { useProductStore } from '@/store/product.store';
import toast from 'react-hot-toast';
import { PERMISSION_DENIED } from '@/api/ErrorCodes';

export function monitorProducts() {
	const dbRef = ref(database, 'products');
	console.log('monitoring products');
	onValue(
		dbRef,
		snapshot => {
			const data = snapshot.val();
			console.log({ data });
			useProductStore.getState().updateProducts(data);
		},
		error => {
			console.log(error);
		}
	);
}

export async function addProduct(name, calories, image) {
	try {
		const dbRef = ref(database, 'products');
		await push(dbRef, { name, calories, image });
		toast.success('Product added');
	} catch (error) {
		if (error.code === PERMISSION_DENIED) {
			toast.error("You don't have permission");
		}
		console.error('Error adding product:', error.code);
	}
}

export async function deleteProduct(id) {
	try {
		const dbRef = ref(database, `products/${id}`);
		await set(dbRef, null);
	} catch (error) {
		if (error.code === PERMISSION_DENIED) {
			toast.error("You don't have permission");
		}
		console.error('Error adding product:', error.code);
	}
}
