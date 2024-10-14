import { Router } from "express";
import _default from "@controller/default";

const versionRouter = Router();
versionRouter.all("/", _default);
export default versionRouter;
