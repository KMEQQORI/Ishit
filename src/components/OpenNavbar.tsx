'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '@firebase/auth';
import { auth } from '@/lib/firebase';
import { useUserStore } from '@/store/user.store';

export default function OpenNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const logoutUser = useUserStore(state => state.logoutUser);

	const handleLogout = async () => {
		await signOut(auth);
		logoutUser();
	};
	return (
		<div>
			{/* Navbar */}
			<nav className="bg-slate-200 p-4 flex justify-between items-center">
				{/* Menu Button */}
				<button
					onClick={() => setIsMenuOpen(true)}
					className="w-12 h-12 bg-gray-900 text-white p-3 rounded-md focus:outline-none"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
					</svg>
				</button>

				{/* User Profile SVG */}
				<div className="w-16 h-16 flex  items-center justify-center">
					<Image src="/logo.png" alt="Vercel Logo" width={300} height={300} priority />
				</div>
			</nav>

			{/* Fullscreen Menu */}
			{isMenuOpen && (
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
							<Link href="/home" onClick={() => setIsMenuOpen(false)} className="hover:underline">
								home
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
							<Link href='' onClick={() => handleLogout()} className="hover:underline">
								logout
							</Link>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}
