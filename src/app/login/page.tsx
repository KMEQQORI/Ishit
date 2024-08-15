import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat';
import auth = firebase.auth;

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async e => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Rediriger vers la page d'accueil après connexion
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
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
			</div>
		</div>
	);
}
