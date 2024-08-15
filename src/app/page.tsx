'use client';
import { BearCounter } from '@/app/bear/BearCounter';
import { BearControls } from '@/app/bear/BearContols';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user.store';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from '@/lib/firebase';
import Login from '@/app/login/login';
import Signup from '@/app/login/Signup';

export default function Home() {
	const logUser = useUserStore(state => state.logUser);
	const logoutUser = useUserStore(state => state.logoutUser);
	const user = useUserStore(state => state.user);
	const [isSignup, setIsSignup] = useState(false);

	async function handleLogout() {
		await signOut(auth);
		logoutUser();
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				logUser(currentUser);
			} else {
				logoutUser();
			}
		});
	});

	return (
		<main className="flex  flex-col items-center h-screen justify-between">
			{!!user ? (
				<div>
					<div onClick={handleLogout}> logout</div>
					<BearCounter />
					<BearControls />
				</div>
			) : isSignup ? (
				<div>
					<Signup />
					<div className="flex  flex-col items-center">
						<p> vous avez déja un compte : </p>
						<p onClick={() => setIsSignup(false)}> connectez-vous </p>
					</div>
				</div>
			) : (
				<div>
					<Login />
					<div className="flex  flex-col items-center">
						<p> vous n'avez pas de compte : </p>
						<p onClick={() => setIsSignup(true)}> rejoignez-nous </p>
					</div>
				</div>
			)}
		</main>
	);
}
