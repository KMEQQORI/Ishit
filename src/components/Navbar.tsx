'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
				<div className="w-12 h-12 flex  items-center justify-center border-2 border-black rounded-md  text-blue-600 rounded-md">
					<Image src="/AZUR.png" alt="Vercel Logo" width={300} height={300} priority />
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
								today
							</Link>
						</li>
						<li>
							<Link href="/home2" onClick={() => setIsMenuOpen(false)} className="hover:underline">
								
							</Link>
						</li>
						<li>
							<Link href="/home3" onClick={() => setIsMenuOpen(false)} className="hover:underline">
								Contact
							</Link>
						</li>
						<hr />
						<li>
							<Link href="/home3" onClick={() => setIsMenuOpen(false)} className="hover:underline">
								logout
							</Link>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}
