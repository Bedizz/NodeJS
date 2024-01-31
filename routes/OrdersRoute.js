import express  from "express";
import { getOrders, getOrder ,postOrder ,modifyOrder ,deleteOrder } from "../controllers/OrderController.js";
import { orderValidation } from "../controllers/OrderController.js";


const ordersRoute = express.Router();

ordersRoute.get("/", getOrders); 
ordersRoute.get("/:id", getOrder);
ordersRoute.post("/",orderValidation, postOrder);
ordersRoute.put("/:id",orderValidation, modifyOrder);
ordersRoute.delete("/:id", deleteOrder);



export default ordersRoute;