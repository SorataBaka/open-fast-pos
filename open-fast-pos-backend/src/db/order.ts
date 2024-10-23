import { OrderDocument, OrderItem } from "@domain/order";
import mongoose from "mongoose";
import { ProductSchema } from "@db/product";
import AutoIncrement from "@db/plugins/increment";
// import { Schema } from "mongoose";

const orderItemSchema = new mongoose.Schema<OrderItem>({
	item: ProductSchema,
	amount: {
		type: Number,
		required: true,
	},
});

const schema = new mongoose.Schema<OrderDocument>({
	order_number: {
		type: Number,
		unique: true,
	},
	order_items: [orderItemSchema],
	total: {
		type: Number,
		required: true,
		min: 0,
	},
	receive: {
		type: Number,
		required: true,
		min: 0,
	},
	paid_done: {
		type: Date,
		default: null,
	},
	prep_done: {
		type: Date,
		default: null,
	},
	serve_done: {
		type: Date,
		default: null,
	},
	created_at: {
		type: Date,
		required: true,
	},
});

schema.plugin(AutoIncrement, { field: "order_number", model_name: "orders" });

export default mongoose.model("orders", schema);
