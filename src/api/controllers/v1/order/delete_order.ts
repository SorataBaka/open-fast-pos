import { OKResponse } from "@domain/reponse";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json({
			status: 200,
			message: "OK",
			code: "OK",
			valid: true,
			data: null,
		} as OKResponse<null>);
	} catch (e) {
		next(e);
	}
};
