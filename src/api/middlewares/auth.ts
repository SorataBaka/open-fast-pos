import { ValidateJwt } from "@lib/token";
import { Request, Response, NextFunction } from "express";
import UserSchema from "@db/user";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const headers = req.headers.authorization;
		if (headers === undefined) {
			throw new Error("Authorization header is not provided");
		}
		const [type, token] = headers.split(" ");
		if (type.length === 0 || token.length === 0) {
			throw new Error("Invalid token format");
		}
		if (type.toUpperCase() !== "BEARER") {
			throw new Error("Invalid token type");
		}
		const validationResult = await ValidateJwt(token.trim()).catch(() => null);
		const id = validationResult?.payload._id;
		const userQuery = await UserSchema.findOne({ _id: id });
		if (userQuery === null) {
			throw new Error("User not found");
		}
		res.locals.user = userQuery;
		delete res.locals.user.password_hash;
		next(null);
	} catch (e) {
		next(e);
	}
};
