// import { body } from "express-validator";

export const secure = (req, res, next) => {
    const textToken = process.env.TOKEN
    const {token} = req.body;
    if (!token || token !== textToken || token.lenght < 3) {
        return res.status(403).json({message: "Unauthorized"})
    } else {
        console.log("hello world")
        next();
    }
}