import _default from "@controller/default";
import { Router } from "express";
import register from "@controller/v1/register";
import login from "@controller/v1/login";
import auth from "@middleware/auth";
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.all("/", auth, _default);

export default authRouter;
