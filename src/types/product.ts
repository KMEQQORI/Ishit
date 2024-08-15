export type Product = {
	name: string;
	calories: number;
	image?: string;
};

export type ProductList = {
	[s: string]: Product;
};
