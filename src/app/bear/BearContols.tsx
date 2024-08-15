'use client';
import React from 'react';
import { useBearStore } from '@/app/bear/bear.store';

export function BearControls() {
	const increasePopulation = useBearStore(state => state.increasePopulation);
	return (
		<button
			className="bg-white text-lg font-sans border-2 border-blue-300 text-blue-500 rounded-md px-8 py-3 hover:bg-blue-50"
			onClick={increasePopulation}
		>
			click me plz
		</button>
	);
}
