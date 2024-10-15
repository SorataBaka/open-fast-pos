import "tsconfig-paths/register";
import express from "express";
import versionRouter from "@route/baseRouter";
import notfound from "@middleware/notfound";
import error from "@middleware/error";
const app = express();
app.use(express.json());
app.use("/api", versionRouter);
app.use(error);
app.use("*", notfound);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
