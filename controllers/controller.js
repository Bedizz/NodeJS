import {pool} from '../db/pool.js';
import { body, validationResult } from 'express-validator';



// here we define the validation rules for the request body under the name userValidation
export const userValidation = [
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    // body('age').isNumeric().notEmpty()
    body('age').notEmpty().isInt({min: 1}) // this is better because isNumeric accepts decimals like 12.34

]

export const checkingUser = async (req, res,next) => {
    const {id} = req.params;
    try {
        const text = "SELECT * FROM users WHERE id = $1";
        const values = [id];
        const checkedUser= await pool.query(text, values);
        if (checkedUser.rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.sendStatus(400).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}

// ---------------------------------------------------------------------------------Get Users-------------------------------------------------
export const getUsers = async (req, res) => {
    
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        res.json(rows);
        console.log(rows);
        
    } catch (error) {
        res.sendStatus(500)
        
    }
}
// ---------------------------------------------------------------------------------Get User-------------------------------------------------
export const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const text = "SELECT * FROM users WHERE id = $1";
        const values = [id];
        const { rows } = await pool.query(text, values);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.sendStatus(400);
        }
        console.log(rows);
    }
     catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
// ---------------------------------------------------------------------------------Create User-------------------------------------------------
export const postUser = async (req, res) => {
    // const {first_name, last_name, age} = req.body;
    const {first_name, last_name} = req.body;
    try {
        // here we check if the request body is valid according to the validation rules we defined above
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        // if the request body is not valid, we return a 400 error with the validation errors
        }
      
        // const { rows } = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *", [first_name, last_name, age]);
        const text= "INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING *";
        const values = [first_name, last_name];
        const { rows } = await pool.query(text, values);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
// ---------------------------------------------------------------------------------Update User-------------------------------------------------
export const modifyUser = async (req, res) => {
    const {id} = req.params;
    // const { first_name, last_name, age, active } = req.body;
    const { first_name, last_name} = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // const { rows } = await pool.query("UPDATE users SET  first_name= $1 last_name= $2 age = $3 active=$4 WHERE id = $5 RETURNING *" , [first_name, last_name, age, active, id]);
        const text = "UPDATE users SET  first_name= $1 last_name= $2  WHERE id = $3 RETURNING *";
        const values = [first_name, last_name, id];
        const { rows } = await pool.query(text , values);
        if (rows.length === 0) {
            res.sendStatus(404).json({ message: "User not found" });
        }
        res.json(rows[0]);
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
// ---------------------------------------------------------------------------------Delete User-------------------------------------------------
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const text = "DELETE FROM users WHERE id = $1 RETURNING *";
        const values = [id];
        const { rows } = await pool.query(text, values);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}   
// ---------------------------------------------------------------------------------Get Orders by Users-------------------------------------------------
export const getOrdersByUser = async (req, res) => {
    const {id} = req.params;
    try {
        const text = "SELECT * FROM orders WHERE user_id = $1";
        const values = [id];
        const {rows} = await pool.query(text,values);
        res.json(rows);
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        
    }
}

// ---------------------------------------------------------------------------------Get Active Users-------------------------------------------------
export const checkActive = async (req, res) => {
    const {id} = req.params;
    try {
        const text = "SELECT * FROM orders WHERE user_id = $1";
        const values = [id];
        const checkOrders = await pool.query(text, values);
        if (checkOrders.rows.length === 0) {
            const text = "UPDATE users SET active = false WHERE id = $1 RETURNING *" ;
            const values = [id];
            const {rows} = await pool.query(text,values);
            res.json(rows);
        }
         else {
            res.json({message: "User has orders, cant be inactive"});
        }
    } catch (error) {
        res.sendStatus(500).json({message: "Error"});
        
    }
}