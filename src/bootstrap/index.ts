import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import baseRouter from "@route/base_router";
import notfound from "@middleware/notfound";
import error from "@middleware/error";
import setupEnv from "@bootstrap/env";
import setupDb from "@bootstrap/db";

dotenv.config();

const env = setupEnv();
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(baseRouter);
app.use(error);
app.use("*", notfound);

app.listen(env.PORT, async () => {
	await setupDb(env);
	console.log("Listening on port 3000");
});
