'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from '@firebase/auth';
import { auth } from '@/lib/firebase';
import { useUserStore } from '@/store/user.store';
import { SetterType } from '@/types/functions.type';

export default function NavbarMenu({ setIsMenuOpen }: { setIsMenuOpen: SetterType }) {
	const logoutUser = useUserStore(state => state.logoutUser);

	const handleLogout = async () => {
		await signOut(auth);
		logoutUser();
	};
	return (
		<div className="fixed inset-0 bg-gray-900 flex flex-col justify-center items-center text-white z-50">
			<button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-white focus:outline-none">
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<ul className="text-center space-y-6 text-lg">
				<li>
					<Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:underline">
						products
					</Link>
				</li>
				<li>
					<Link href="/profile" onClick={() => setIsMenuOpen(false)} className="hover:underline">
						profile
					</Link>
				</li>
				<li>
					<Link href="/bear" onClick={() => setIsMenuOpen(false)} className="hover:underline">
						bear
					</Link>
				</li>

				<hr />
				<li>
					<Link href="" onClick={() => handleLogout()} className="hover:underline">
						logout
					</Link>
				</li>
			</ul>
		</div>
	);
}