// import {pool} from '../database';
// import { body } from 'express-validator';

//----------------------Application Middleware-------------------
export const secure = (req, res, next) => {
    const textToken = process.env.TOKEN
    const {token} = req.body;
    if (!token || token !== textToken) {
        return res.status(401).json({message: "Unauthorized"})
    } else {
        console.log("hello world")
        next();
    }
}