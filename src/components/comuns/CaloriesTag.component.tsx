'use client';
import React, { useEffect } from 'react';
import { getCaloriesBgColor, getCaloriesTextColor } from '@/app/utils/colors';

function CaloriesTag({ count }) {
	const bgColor = getCaloriesTextColor({ count });
	return (
		<div className={`text-2xl rounded-md font-bold text-white ${bgColor} flex flex-row justify-center content-center`}>
			<p>{count}</p>
			<span className="text-xs ">Kcal</span>
		</div>
	);
}

export default CaloriesTag;
