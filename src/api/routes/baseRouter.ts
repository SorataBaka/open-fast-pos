//Useless file. Only here to make the directory prettier
import express from "express";
import versionRouter from "@route/versions/versionRouter";
const baseRouter = express.Router();
baseRouter.use(versionRouter);
export default baseRouter;
