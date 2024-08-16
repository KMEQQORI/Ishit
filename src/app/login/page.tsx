'use client';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user.store';
import { onAuthStateChanged, signOut, User } from '@firebase/auth';
import { auth } from '@/lib/firebase';
import Signup from '@/components/authentication/Signup';
import Login from '@/components/authentication/login';
import { UserType } from '@/types/user.type';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const user = useUserStore(state => state.user);
	const logUser = useUserStore(state => state.logUser);
	const logoutUser = useUserStore(state => state.logoutUser);
	const [isSignup, setIsSignup] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				logUser(currentUser as UserType);
			} else {
				logoutUser();
			}
		});
		if (!!user) {
			router.replace('/');
		}
	});

	async function handleLogout() {
		await signOut(auth);
		logoutUser();
	}

	return (
		<main className="flex  flex-col items-center h-screen justify-between">
			{isSignup ? (
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
						<p> {"vous n'avez pas de compte :"}</p>
						<p onClick={() => setIsSignup(true)}> rejoignez-nous </p>
					</div>
				</div>
			)}
		</main>
	);
}
