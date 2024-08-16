'use client';
import React, { useEffect } from 'react';
import { getCaloriesBgColor, getCaloriesTextColor } from '@/app/utils/colors';

function CaloriesTag({ count }) {
	const bgColor = getCaloriesTextColor({ count });
	return (
		<div
			className={`w-2/12 text-xl rounded-md font-bold ${bgColor} flex flex-row justify-center content-center overflow-hidden`}
		>
			<p>{count}</p>
			<span className="text-xs ">Kcal</span>
		</div>
	);
}

export default CaloriesTag;
