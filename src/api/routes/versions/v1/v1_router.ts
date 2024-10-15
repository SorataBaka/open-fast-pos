import _default from "@controller/default";
import { Router } from "express";
import authRouter from "@route/versions/v1/auth_router";
const v1Router = Router();
v1Router.use("/auth", authRouter);
v1Router.all("/", _default);
export default v1Router;
