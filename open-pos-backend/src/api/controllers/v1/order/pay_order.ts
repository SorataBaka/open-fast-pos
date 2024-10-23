import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import OrderModel from "@db/order";
import { OrderDocument, PayOrder } from "@domain/order";
import joi from "joi";

const bodyValidator = joi.object({
	amount: joi.number().min(0).required(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const param = req.params.query;
		const requestBody = req.body;

		const validateBody = bodyValidator.validate(requestBody);
		if (validateBody.error) throw validateBody.error;
		const body = validateBody.value as PayOrder;

		let queryOptions;
		if (isValidObjectId(param)) {
			queryOptions = {
				_id: param,
				paid_done: null,
			};
		} else {
			queryOptions = {
				order_number: param,
				paid_done: null,
			};
		}

		const validateAmountQuery = await OrderModel.findOne(queryOptions);
		if (validateAmountQuery === null) throw new Error("Order not found");
		if (validateAmountQuery.total > body.amount)
			throw new Error("Amount is smaller than order price total");
		const updateResult = await OrderModel.findOneAndUpdate(
			queryOptions,
			{
				receive: body.amount,
				paid_done: new Date(),
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
