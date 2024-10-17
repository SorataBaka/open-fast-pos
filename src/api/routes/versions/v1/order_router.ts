import { Router } from "express";
import _default from "@controller/default";
import auth from "@middleware/auth";
import create_order from "@controller/v1/order/create_order";
import list_order from "@controller/v1/order/list_order";
import delete_order from "@controller/v1/order/delete_order";

const orderRouter = Router();

orderRouter.use(auth);
orderRouter.all("/", _default);
orderRouter.post("/create", create_order);
orderRouter.get("/list", list_order);
orderRouter.delete("/delete/:query", delete_order);

export default orderRouter;
