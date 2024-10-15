export interface Product {
	product_name: string;
	description: ?string;
	product_price: number;
	product_cost: number;
	product_tag: string[];
	created_at: Date;
	updated_at: Date;
	deleted_at: ?Date;
}
//eslint-disable-next-line
export interface ProductDocument extends Product {}


