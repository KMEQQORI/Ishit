import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { LOGGING_IN, useUserStore } from '@/store/user.store';
import { UserType } from '@/types/user.type';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
	const ComponentWithAuth = (props: P) => {
		const router = useRouter();
		const user = useUserStore(state => state.user) as string;

		useEffect(() => {
			if (!user) {
				router.push('/login');
			}
		}, [user, router]);

		if (user === LOGGING_IN) {
			return (
				<div className="fixed inset-0 flex items-center justify-center bg-white z-50">
					<img src="/logo.png" alt="Loading..." className="h-32 w-32 animate-ping" />
				</div>
			);
		}

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
