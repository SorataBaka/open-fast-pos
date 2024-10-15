import { NextFunction, Request, Response } from "express";
import { InvalidResponse } from "@domain/reponse";
export default async (
	error: Error,
	_req: Request,
	res: Response,
	//eslint-disable-next-line
	_next: NextFunction
) => {
	if (!error) {
		res.status(400).json({
			status: 400,
			message: "Request Invalid",
			code: "INVALIDREQUEST",
			valid: false,
			error: null,
		} as InvalidResponse<null>);
		return;
	}
	res.status(400).json({
		status: 400,
		message: "Request Invalid",
		code: "INVALIDREQUEST",
		valid: false,
		error,
	} as InvalidResponse<Error>);
};
