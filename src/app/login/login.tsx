import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useUserStore } from '@/store/user.store';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const logUser = useUserStore(state => state.logUser);

	const handleLogin = async e => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Rediriger vers la page d'accueil après connexion
		} catch (error) {
			setError(error.message);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			// Rediriger vers la page d'accueil après connexion
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="bg-white p-8 rounded-lg shadow-md w-96">
			<h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						Mot de passe
					</label>
					<input
						type="password"
						id="password"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
					Connexion
				</button>
			</form>
			<div className="mt-4 text-center">
				<button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
					Connexion avec Google
				</button>
			</div>
		</div>
	);
}
