export type ProductType = {
	name: string;
	calories: number;
	image?: string;
};

export type ProductList = {
	[s: string]: ProductType;
};
