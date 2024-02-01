import express  from "express";
import { verifyToken } from "../controllers/verifyController.js";
import {secure} from '../middlewares/users.js'


const verifyRoute = express.Router();

verifyRoute.get("/:token",secure,verifyToken)


export default verifyRoute;