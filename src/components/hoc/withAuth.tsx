import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useUserStore } from '@/store/user.store';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
	const ComponentWithAuth = (props: P) => {
		const router = useRouter();
		const user = useUserStore(state => state.user);

		useEffect(() => {
			if (!user) {
				router.replace('/login');
			}
		}, [user, router]);

		// Si l'utilisateur n'est pas authentifié, on ne rend rien pour éviter de montrer le composant non protégé.
		if (!user) {
			return null;
		}

		// Si l'utilisateur est authentifié, on rend le composant passé en paramètre
		return <WrappedComponent {...props} />;
	};

	return ComponentWithAuth;
};

export default withAuth;
