import { Request, Response, NextFunction } from "express";
import { InvalidResponse, OKResponse } from "@domain/reponse";
import joi from "joi";
import UserModel from "@db/user";
import { UserDocument, UserRegister } from "@domain/user";
import { Hash } from "@lib/hash";

const schema = joi.object({
	username: joi.string().min(5).max(10).alphanum().required(),
	password: joi
		.string()
		.pattern(/^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$/)
		.min(8)
		.max(30)
		.required(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reqBody = schema.validate(req.body);
		if (reqBody.error) throw reqBody.error;
		const user = reqBody.value as UserRegister;

		//Check if user exists
		const userDb = await UserModel.findOne({ username: user.username });

		if (userDb !== null) {
			res.status(400).json({
				status: 400,
				message: "Duplicate user found",
				code: "INVALIDREQUEST",
				valid: false,
				error: null,
			} as InvalidResponse<null>);
			return;
		}
		const newUser = new UserModel({
			created_at: new Date(),
			password_hash: await Hash(user.password, 8),
			username: user.username,
		});
		const saveNewUser = await newUser.save().catch(() => null);
		if (saveNewUser === null) {
			res.status(500).json({
				status: 500,
				message: "Internal Server error",
				code: "INTERNALERROR",
				valid: false,
				error: null,
			} as InvalidResponse<null>);
			return;
		}

		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: saveNewUser,
		} as OKResponse<UserDocument>);
		return;
	} catch (e) {
		next(e);
	}
};
