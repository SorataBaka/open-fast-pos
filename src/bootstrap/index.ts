import "tsconfig-paths/register";
import express from "express";
import versionRouter from "@route/baseRouter";
import notfound from "@middleware/notfound";

const app = express();
app.use(express.json());
app.use("/api", versionRouter);
app.use("*", notfound);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
