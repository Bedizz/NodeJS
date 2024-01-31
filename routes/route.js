import express  from "express";
import { getUsers, getUser, postUser ,modifyUser, deleteUser, getOrdersByUser, checkActive } from "../controllers/controller.js";
import { userValidation ,checkingUser } from "../controllers/controller.js";


const route = express.Router();

route.get("/", getUsers); 
route.get("/:id",checkingUser, getUser);
route.post("/",userValidation, postUser);
route.put("/:id",userValidation, modifyUser);
route.delete("/:id", deleteUser);
route.get('/:id/orders',getOrdersByUser)
route.get('/:id/check-active',checkActive)



export default route;