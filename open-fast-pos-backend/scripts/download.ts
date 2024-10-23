import mongoose from "mongoose";
import dotenv from "dotenv";
import OrderModel from "../src/db/order";
import fs from "fs";

dotenv.config();
const token = process.env.MONGO_URI;
if (!token) throw new Error("MONGO_URI not found");
mongoose.connect(token);

const fetchOrders = async () => {
	const data = await OrderModel.find({
		order_number: {
			$gt: 225,
		},
	});
	fs.writeFileSync("day-2.json", JSON.stringify(data));
};

fetchOrders();
