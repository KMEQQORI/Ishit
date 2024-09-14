'use client';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user.store';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from '@/lib/firebase';
import { UserType } from '@/types/user.type';
import WithAuth from '@/components/hoc/withAuth';
import ReactCalculator from 'react-calculator-ts';

function Home() {
	const logUser = useUserStore(state => state.logUser);
	const logoutUser = useUserStore(state => state.logoutUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				logUser(currentUser as UserType);
			} else {
				logoutUser();
			}
		});
	});

	return (
		<main className="flex  flex-col items-center h-screen justify-between w-10/12 content-center">
			<div>home</div>
		</main>
	);
}

export default WithAuth(Home);
