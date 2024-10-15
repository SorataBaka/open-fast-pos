import { Request, Response } from "express";
import { NotFoundResponse } from "@domain/reponse";
export default async (req: Request, res: Response) => {
	res.status(404).json({
		status: 404,
		message: "Not Found",
		code: "NOTFOUND",
		valid: false,
		path: req.url,
	} as NotFoundResponse);
};
