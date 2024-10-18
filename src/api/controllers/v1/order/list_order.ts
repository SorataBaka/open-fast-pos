import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import OrderModel from "@db/order";
import { OrderDocument } from "@domain/order";

interface Query {
	type: "prep" | "serve" | "all" | "done";
	limit: number;
	page: number;
}

const QueryObject = Joi.object({
	type: Joi.string().valid("prep", "serve", "all", "done").default("all"),
	limit: Joi.number().min(0).max(20).default(10),
	page: Joi.number().min(0).default(0),
});
// MAYBE CHANGE THIS. TOO MANY COMBINATIONS
export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const requestQueries = req.query;
		const validateQueries = QueryObject.validate(requestQueries);
		if (validateQueries.error) throw validateQueries.error;
		const query = validateQueries.value as Query;
		let queryOptions;
		switch (query.type) {
			case "prep":
				queryOptions = { prep_done: null, serve_done: null };
				break;
			case "serve":
				queryOptions = { prep_done: { $ne: null }, serve_done: null };
				break;
			case "done":
				queryOptions = { prep_done: { $ne: null }, serve_done: { $ne: null } };
				break;
			default:
				queryOptions = {};
		}
		const orderResult = await OrderModel.find(queryOptions)
			.sort({
				create_at: "desc",
			})
			.skip(query.limit * query.page)
			.limit(query.limit);

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: false,
			data: orderResult,
		} as OKResponse<OrderDocument[]>);
		return;
	} catch (e) {
		next(e);
	}
};
