import { onValue, push, ref } from '@firebase/database';
import { database } from '@/lib/firebase';
import { useProductStore } from '@/store/product.store';
import toast from 'react-hot-toast';

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
		toast('yellow');
	} catch (error) {
		console.error('Error adding product:', error);
	}
}
