'use client';
import { useUserStore } from '@/store/user.store';
import OpenNavbar from '@/components/OpenNavbar';
import ClosedNavbar from '@/components/ClosedNavbar';

export default function Navbar() {
	const logUser = useUserStore(state => state.logUser);
	const logoutUser = useUserStore(state => state.logoutUser);
	const user = useUserStore(state => state.user);

	return !!user ? <OpenNavbar /> : <ClosedNavbar />;
}
