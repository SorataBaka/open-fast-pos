import _default from "@controller/default";
import { Router } from "express";
import register from "@controller/v1/register";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.all("/", _default);
export default authRouter;
