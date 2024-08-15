import React from 'react';
import { useBearStore } from '@/app/bear/bear.store';

export function BearCounter() {
	const bears = useBearStore(state => state.bears);
	return <h1 className="text-lg text-zinc-400">{bears} around here...</h1>;
}
