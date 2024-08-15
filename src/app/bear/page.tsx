'use client';
import React from 'react';
import { BearCounter } from '@/app/bear/BearCounter';
import { BearControls } from '@/app/bear/BearContols';

export default function home() {
	return (
		<div>
			<BearCounter />
			<BearControls />
		</div>
	);
}
