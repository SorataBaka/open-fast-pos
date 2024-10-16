import ProductSchema from "@db/product";
import { NewProduct, ProductDocument } from "@domain/product";
import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import joi from "joi";

const ValidateBody = joi.object({
	product_name: joi.string().min(3).required(),
	description: joi.string(),
	product_price: joi.number().min(0).required(),
	product_tag: joi.array().items(joi.string()).required(),
	product_cost: joi.number().min(0).required(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = ValidateBody.validate(req.body);
		if (validation.error) throw validation.error;
		const productData = validation.value as NewProduct;
		const newItem = new ProductSchema({
			product_name: productData.product_name,
			description: productData.description,
			product_price: productData.product_price,
			product_cost: productData.product_cost,
			product_tag: productData.product_tag,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null,
		});

		const saveItem = await newItem.save();
		if (saveItem === null) throw new Error("Product not found");

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: saveItem,
		} as OKResponse<ProductDocument>);
	} catch (e) {
		next(e);
	}
};
