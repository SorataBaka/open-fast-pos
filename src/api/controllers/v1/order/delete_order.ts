import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import OrderModel from "@db/order";
import { OrderDocument } from "@domain/order";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const param = req.params.query;
		let databaseQuery;
		if (isValidObjectId(param)) {
			databaseQuery = { _id: param };
		} else {
			databaseQuery = { order_number: param };
		}
		const deleteResult = await OrderModel.findOneAndDelete(databaseQuery);
		if (deleteResult === null) throw new Error("Order not found");

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: deleteResult,
		} as OKResponse<OrderDocument>);
	} catch (e) {
		next(e);
	}
};
