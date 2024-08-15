'use client';
import Image from 'next/image';

export default function ClosedNavbar() {
	return (
		<div>
			<nav className="bg-slate-200 p-4 flex justify-between items-center">
				<div className="w-16 h-16 flex mx-auto items-center justify-center">
					<Image src="/logo.png" alt="Vercel Logo" width={300} height={300} priority />
				</div>
			</nav>
		</div>
	);
}
