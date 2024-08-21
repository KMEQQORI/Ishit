'use client';
import React, { useEffect, useState } from 'react';
import Signup from '@/components/authentication/Signup';
import Login from '@/components/authentication/login';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user.store';

export default function LoginPage() {
	const router = useRouter();
	const user = useUserStore(state => state.user);
	const [isSignup, setIsSignup] = useState(false);

	useEffect(() => {
		if (!!user) {
			router.back();
		}
	});

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
