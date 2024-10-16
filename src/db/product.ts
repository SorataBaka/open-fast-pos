import { ProductDocument } from "@domain/product";
import mongoose from "mongoose";

const Product = new mongoose.Schema<ProductDocument>({
	product_name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	description: {
		type: String,
	},
	product_price: {
		type: Number,
		required: true,
		min: 0,
	},
	product_cost: {
		type: Number,
		required: true,
		min: 0,
	},
	product_tag: {
		type: [String],
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
	},
	updated_at: {
		type: Date,
		required: true,
	},
	deleted_at: {
		type: Date,
	},
});

export default mongoose.model("products", Product);
