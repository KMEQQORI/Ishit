import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignup = async e => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			// Rediriger vers la page d'accueil après inscription
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="bg-white p-8 rounded-lg shadow-md w-96">
			<h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
			<form onSubmit={handleSignup}>
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
					Inscription
				</button>
			</form>
		</div>
	);
}
