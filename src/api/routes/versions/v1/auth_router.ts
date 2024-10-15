import _default from "@controller/default";
import { Router } from "express";
const authRouter = Router();
authRouter.all("/", _default);
export default authRouter;
