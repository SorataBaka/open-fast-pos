import mongoose from "mongoose";
import dotenv from "dotenv";
import OrderModel from "@db/order";
import fs from "fs";

dotenv.config();

const token = process.env.MONGO_URI;

if (token === undefined) throw new Error("TOKEN NOT PROVIDED");

mongoose.connect(token);

const getData = async () => {
	const data = await OrderModel.find({
		order_number: {
			$gte: 53,
		},
	});
	fs.writeFileSync("output.json", JSON.stringify(data));
};
getData();
