import ProductSchema from "@db/product";
import { ProductDocument } from "@domain/product";
import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId, Types } from "mongoose";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const query = req.params.search;
		const buildQuery = isValidObjectId(query)
			? { _id: new Types.ObjectId(query), deleted_at: null }
			: { product_name: query, deleted_at: null };

		const queryResult = await ProductSchema.findOneAndDelete(buildQuery);

		if (queryResult === null) throw new Error("Product not found");

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: queryResult,
		} as OKResponse<ProductDocument>);
		return;
	} catch (e) {
		next(e);
	}
};
