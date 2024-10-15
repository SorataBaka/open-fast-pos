import { Request, Response } from "express";
import { DefaultResponse } from "@domain/reponse";
export default (req: Request, res: Response) => {
	res.status(200).json({
		status: 200,
		message: "OK",
		code: "OK",
		valid: true,
		path: req.originalUrl,
	} as DefaultResponse);
	return;
};
