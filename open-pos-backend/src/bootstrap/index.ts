import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import baseRouter from "@route/base_router";
import notfound from "@middleware/notfound";
import error from "@middleware/error";
import setupEnv from "@bootstrap/env";
import setupDb from "@bootstrap/db";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const env = setupEnv();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:3001",
			"http://localhost:3000",
			"https://frontpos.tianharjuno.com",
		],
		credentials: true,
	},
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: [
			"http://localhost:3001",
			"http://localhost:3000",
			"https://frontpos.tianharjuno.com",
		],
	})
);
app.use(baseRouter);
app.use(error);
app.use("*", notfound);

server.listen(env.PORT, async () => {
	await setupDb(env);
});
export default io;
