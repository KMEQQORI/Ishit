'use client';
import React from 'react';
import { useUserStore } from '@/store/user.store';
import withAuth from "@/components/hoc/withAuth";

function Profile() {
	const user = useUserStore(state => state.user);
	return (
		<div className="flex flex-col justify-between mx-auto mt-20">
			<div className="w-10/12 mx-auto bg-gray-50 p-4 rounded-md">
				<div className="flex flex-row p-2 m-h-4">
					<p className="text-sm font-bold font-serif">Email :</p>
					<p className="text-sm  font-serif">{user?.email}</p>
				</div>
				<div className="flex flex-row p-2 m-h-4">
					<p className="text-sm font-bold font-serif">Name :</p>
					<p className="text-sm font-serif">{user?.displayName}</p>
				</div>
				<div className="flex flex-row p-2 m-h-4">
					<p className="text-sm font-bold font-serif">uid :</p>
					<p className="text-sm  font-serif">{user?.uid}</p>
				</div>
			</div>
			<img className="w-32 h-32 rounded-b-full mt-8 self-center" src={user?.photoURL} alt="Image de la carte" />
		</div>
	);
}

export default withAuth(Profile);
