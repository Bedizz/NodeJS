import express  from "express";
import { getOrders, getOrder ,postOrder ,modifyOrder ,deleteOrder } from "../controllers/OrderController.js";


const ordersRoute = express.Router();

ordersRoute.get("/", getOrders); 
ordersRoute.get("/:id", getOrder);
ordersRoute.post("/", postOrder);
ordersRoute.put("/:id", modifyOrder);
ordersRoute.delete("/:id", deleteOrder);



export default ordersRoute;