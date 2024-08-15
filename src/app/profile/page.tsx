'use client';
import React from 'react';
import { useUserStore } from '@/store/user.store';

export default function Profile() {
	const user = useUserStore(state => state.user);
	return (
		<div className="flex  flex-col items-center justify-between p-24">
			<div className="flex  flex-col p-4">
				<p className="text-lg font-bold font-serif">Email</p> :{' '}
				<p className="text-lg font-bold font-serif">{user?.email}</p>
			</div>
			<div className="flex  flex-col p-4">
				<p className="text-lg font-bold font-serif">displayName</p> :{' '}
				<p className="text-lg font-bold font-serif">{user?.displayName}</p>
			</div>
			<div className="flex  flex-col p-4">
				<p className="text-lg font-bold font-serif">uid</p> :{' '}
				<p className="text-lg font-bold font-serif">{user?.uid}</p>
			</div>
			<div className="flex  flex-col p-4">
				<p className="text-lg font-bold font-serif">Email</p> :{' '}
				<p className="text-lg font-bold font-serif">{user?.uid}</p>
			</div>
			<img className="w-full h-48 object-cover" src={user?.photoURL} alt="Image de la carte" />
		</div>
	);
}
