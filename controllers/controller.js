import {pool} from '../db/pool.js';
import { body, check, validationResult } from 'express-validator';



// here we define the validation rules for the request body under the name userValidation
export const userValidation =[
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    // body('age').isNumeric().notEmpty()
    body('age').isInt({min: 1}) // this is better because isNumeric accepts decimals like 12.34

]
export const getUsers = async (req, res) => {
    
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        res.json(rows);
        console.log(rows);
        
    } catch (error) {
        res.sendStatus(500)
        
    }
}

export const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({message: "No users found"});
        }
        console.log(rows);
    }
     catch (error) {
        res.sendStatus(500)
    }
}

export const postUser = async (req, res) => {
    const {first_name, last_name, age} = req.body;
    try {
        // here we check if the request body is valid according to the validation rules we defined above
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        // if the request body is not valid, we return a 400 error with the validation errors
        }
      
        const { rows } = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *", [first_name, last_name, age]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500).json({message: "Error"});
    }
}

export const modifyUser = async (req, res) => {
    const {id} = req.params;
    const { first_name, last_name, age, active } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { rows } = await pool.query("UPDATE users SET  first_name= $1 last_name= $2 age = $3 active=$4 WHERE id = $5 RETURNING *" , [first_name, last_name, age, active, id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500).json({message: "Error"});
    }
}
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500).json({message: "Error"});
    }
}   

export const getOrdersByUser = async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query("SELECT * FROM orders WHERE user_id = $1", [id]);
        res.json(rows);
        
    } catch (error) {
        res.sendStatus(500).json({message: "Error"});
        
    }
}

export const checkActive = async (req, res) => {
    const {id} = req.params;
    try {
        const checkOrders = await pool.query("SELECT * FROM orders WHERE user_id = $1", [id]);
        if (checkOrders.rows.length === 0) {
            const {rows} = await pool.query("UPDATE users SET active = false WHERE id = $1 RETURNING *", [id]);
            res.json(rows);
        }
         else {
            res.json({message: "User has orders, cant be inactive"});
        }
    } catch (error) {
        res.sendStatus(500).json({message: "Error"});
        
    }
}