export function getCaloriesTextColor({ count }) {
	if (count < 100) {
		return 'text-green-500';
	} else if (count < 200) {
		return 'text-yellow-300';
	} else {
		return 'text-orange-800';
	}
}

export function getCaloriesBgColor({ count }) {
	if (count < 100) {
		return 'bg-green-500';
	} else if (count < 200) {
		return 'bg-yellow-300';
	} else {
		return 'bg-orange-800';
	}
}
