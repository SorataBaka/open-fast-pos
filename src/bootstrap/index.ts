import express from "express";
import baseRouter from "@route/base_router";
import notfound from "@middleware/notfound";
import error from "@middleware/error";
const app = express();
app.use(express.json());
app.use(baseRouter);
app.use(error);
app.use("*", notfound);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
