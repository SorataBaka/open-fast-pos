import { Router } from "express";
import _default from "@controller/default";
import auth from "@middleware/auth";
import create_order from "@controller/v1/order/create_order";
import list_order from "@controller/v1/order/list_order";
import delete_order from "@controller/v1/order/delete_order";
import prep_order from "@controller/v1/order/order_prepared";
import serve_order from "@controller/v1/order/order_served";
import pay_order from "@controller/v1/order/pay_order";
const orderRouter = Router();

orderRouter.use(auth);
orderRouter.all("/", _default);
orderRouter.post("/create", create_order);
orderRouter.get("/list", list_order);
orderRouter.delete("/delete/:query", delete_order);
orderRouter.post("/serve/:query", serve_order);
orderRouter.post("/prep/:query", prep_order);
orderRouter.post("/pay/:query", pay_order);

export default orderRouter;
