'use client';
import { useUserStore } from '@/store/user.store';
import OpenNavbar from '@/components/Navbar/OpenNavbar';
import ClosedNavbar from '@/components/Navbar/ClosedNavbar';

export default function Navbar() {
	const user = useUserStore(state => state.user);

	return !!user ? <OpenNavbar /> : <ClosedNavbar />;
}
