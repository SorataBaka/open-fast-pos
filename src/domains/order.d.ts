import { ProductDocument } from "@domain/product";
import { Document } from "mongoose";

export interface OrderItem {
	item: ProductDocument;
	amount: number;
}
export interface Order {
	order_number: number;
	order_items: OrderItem[];
	total: number;
	receive: number;
	paid_done: Date;
	prep_done: Date;
	serve_done: Date;
	created_at: Date;
}

export interface OrderDocument extends Document, Order {}

export interface NewOrder {
	item_name: string;
	item_amount: number;
}

export interface PayOrder {
	amount: number;
}
