'use client';
import { useUserStore } from '@/store/user.store';
import OpenNavbar from '@/components/Navbar/OpenNavbar';
import ClosedNavbar from '@/components/Navbar/ClosedNavbar';
import { useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/lib/firebase';
import { UserType } from '@/types/user.type';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const router = useRouter();
	const user = useUserStore(state => state.user);
	const logUser = useUserStore(state => state.logUser);
	const logoutUser = useUserStore(state => state.logoutUser);

	useEffect(() => {
		onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				logUser(currentUser as UserType);
			} else {
				logoutUser();
			}
		});
	});

	return !!user ? <OpenNavbar /> : <ClosedNavbar />;
}
