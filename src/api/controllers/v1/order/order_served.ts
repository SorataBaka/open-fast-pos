import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import OrderModel from "@db/order";
import { OrderDocument } from "@domain/order";
import socket from "@bootstrap/index";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const param = req.params.query;
		let queryOptions;
		if (isValidObjectId(param)) {
			queryOptions = {
				_id: param,
				serve_done: null,
			};
			//Gotta edit this to make sure cant edit if its not dont preparing
		} else {
			queryOptions = {
				order_number: param,
				serve_done: null,
			};
		}
		const updateResult = await OrderModel.findOneAndUpdate(
			queryOptions,
			{
				serve_done: new Date(),
			},
			{ upsert: false, new: false }
		);
		if (updateResult === null) throw new Error("Order not found");
		socket.emit("message", "none");

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
