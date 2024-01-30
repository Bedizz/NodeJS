import express  from "express";
import { getUsers, getUser, postUser ,modifyUser, deleteUser } from "../controllers/controller.js";


const route = express.Router();

route.get("/", getUsers); 
route.get("/:id", getUser);
route.post("/", postUser);
route.put("/:id", modifyUser);
route.delete("/:id", deleteUser);



export default route;