import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";
import joi from "joi";
import { NewOrder, OrderDocument, OrderItem } from "@domain/order";
import ProductSchema from "@db/product";
import OrderSchema from "@db/order";
import { Document } from "mongoose";

const validateBody = joi
	.array()
	.items(
		joi.object({
			item_name: joi.string().required(),
			item_amount: joi.number().min(1).required(),
		})
	)
	.min(1)
	.required();

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = validateBody.validate(req.body);
		if (validation.error !== undefined) throw validation.error;
		const validatedBody = validation.value as NewOrder[];

		const arrayOfItemNames = Array.from(
			validatedBody.map((item) => item.item_name)
		);

		//Validate each items
		const validateQuery = await ProductSchema.find({
			product_name: { $in: arrayOfItemNames },
		});
		const foundNames = validateQuery.map((product) => product.product_name);
		const validateItems = arrayOfItemNames.every((name) =>
			foundNames.includes(name)
		);
		if (!validateItems)
			throw new Error("Some provided items doesn't exist in the database");
		let priceTotal = 0;

		const orderItems: OrderItem[] = Array.from(
			validateQuery.map((item) => {
				const productAmount =
					validatedBody.find((test) => test.item_name === item.product_name)
						?.item_amount || 1;
				priceTotal += item.product_price * productAmount;
				return {
					item: item,
					amount: productAmount,
				};
			})
		);
		const newOrder = new OrderSchema({
			order_items: orderItems,
			receive: 0,
			created_at: new Date(),
			total: priceTotal,
		});
		const save = await newOrder.save();

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: save,
		} as OKResponse<Document<OrderDocument>>);
		return;
	} catch (e) {
		next(e);
	}
};
