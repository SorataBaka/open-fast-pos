//Useless file. Only here to make the directory prettier
import express from "express";
import versionRouter from "@route/versions/version_router";
import _default from "@controller/default";
const baseRouter = express.Router();
baseRouter.use("/api", versionRouter);
baseRouter.all("/", _default);
export default baseRouter;
