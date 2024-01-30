import express  from "express";
import { getUsers, getUser, postFilm ,modifyFilm, deleteFilm } from "../controllers/controller.js";


const route = express.Router();

route.get("/", getUsers); 
route.get("/:id", getUser);
route.post("/", postFilm);
route.put("/:id", modifyFilm);
route.delete("/:id", deleteFilm);



export default route;