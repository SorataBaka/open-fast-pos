import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import joi from "joi";
import product from "@db/product";
import { ProductDocument } from "@domain/product";

interface EditQuery {
	sort: "desc" | "asc";
	limit: number;
	page: number;
}

const validateQuery = joi.object({
	sort: joi.string().valid("desc", "asc").default("desc"),
	limit: joi.number().min(0).max(20).default(10),
	page: joi.number().min(0).default(0),
});

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const queries = req.query;
		const validate = validateQuery.validate(queries);
		if (validate.error) throw validate.error;
		const queryValidated = validate.value as EditQuery;

		const databaseQuery = await product
			.find()
			.sort({
				created_at: queryValidated.sort,
			})
			.skip(queryValidated.limit * queryValidated.page)
			.limit(queryValidated.limit);

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: databaseQuery,
		} as OKResponse<ProductDocument[]>);
		return;
	} catch (e) {
		next(e);
	}
};
