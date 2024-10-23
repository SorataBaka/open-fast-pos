import { OKResponse } from "@domain/reponse";
import { UserRegister } from "@domain/user";
import { Request, Response, NextFunction } from "express";
import { Compare } from "@lib/hash";
import { GenerateJwt } from "@lib/token";
import UserSchema from "@db/user";
import joi from "joi";
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
		const validateBody = schema.validate(req.body);
		if (validateBody.error != undefined) {
			throw validateBody.error;
		}
		const userCredential = validateBody.value as UserRegister;

		const queryUser = await UserSchema.findOne({
			username: userCredential.username,
		});
		if (queryUser === null) {
			throw new Error("User not found");
		}
		const credentialValid = await Compare(
			userCredential.password,
			queryUser.password_hash
		);
		if (!credentialValid) {
			throw new Error("Invalid credentials");
		}

		const jwtString = await GenerateJwt(queryUser);
		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: {
				type: "Bearer",
				token: jwtString,
			},
		} as OKResponse<{
			type: string;
			token: string;
		}>);
	} catch (e) {
		next(e);
	}
};
