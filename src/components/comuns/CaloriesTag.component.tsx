'use client';
import React, { useEffect } from 'react';
import { getCaloriesBgColor, getCaloriesTextColor } from '@/app/utils/colors';

function CaloriesTag({ count, long }) {
	const bgColor = getCaloriesTextColor({ count });
	return (
		<div
			className={`w-4/12 text-xl rounded-md font-bold ${bgColor} p-4 flex flex-row justify-center content-center overflow-hidden`}
		>
			<p>{count}</p>
			<span className="text-xs">Kcal</span>
			{long && <span className="text-xs">/100g</span>}
		</div>
	);
}

export default CaloriesTag;
