import { Router } from "express";
import auth from "@middleware/auth";
import _default from "@controller/default";
import create from "@controller/v1/items/create";
import _delete from "@controller/v1/items/delete";
import list from "@controller/v1/items/list";
const itemRouter = Router();

itemRouter.use(auth);
itemRouter.all("/", _default);
itemRouter.post("/create", create);
itemRouter.delete("/delete/:search", _delete);
itemRouter.get("/list", list);

export default itemRouter;
