import { Request, Response } from "express"
import { InvalidResponse } from "@domain/reponse"
export default async(req:Request, res:Response) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
    code: "NOTFOUND",
    valid: false,
    error: new Error("INVALIDROUTE: " + req.path)
  } as InvalidResponse<Error>)
}