import { Router } from "express";
import _default from "@controller/default";
import v1Router from "./v1/v1_router";

const versionRouter = Router();
versionRouter.use("/v1", v1Router);
versionRouter.all("/", _default);
export default versionRouter;
