import { Document } from "mongoose";
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

export interface NewProduct {
	product_name: string;
	description: ?string;
	product_price: number;
	product_cost: number;
	product_tag: number[];
}

export interface ProductDocument extends Product, Document {}
