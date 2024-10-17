import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import OrderModel from "@db/order";
import { OrderDocument } from "@domain/order";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const param = req.params;
		let queryOptions;
		if (isValidObjectId(param)) {
			queryOptions = { _id: param };
		} else {
			queryOptions = { order_number: param };
		}
		const updateResult = await OrderModel.findOneAndUpdate(
			queryOptions,
			{
				serve_done: new Date(),
			},
			{ upsert: false, new: false }
		);
		if (updateResult === null) throw new Error("Order not found");

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: updateResult,
		} as OKResponse<OrderDocument>);
		return;
	} catch (e) {
		next(e);
	}
};
