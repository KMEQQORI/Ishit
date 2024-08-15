import { onValue, ref } from '@firebase/database';
import { database } from '@/lib/firebase';
import { useProductStore } from '@/store/product.store';

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
