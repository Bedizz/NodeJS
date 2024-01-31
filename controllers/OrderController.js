import {pool} from '../db/pool.js';
import { body, validationResult } from 'express-validator';

export const orderValidation =[
    body('user_id').isInt().notEmpty(),
    body('date').isDate().notEmpty(),
    body('price').isNumeric({min: 0}) 
]

export const getOrders = async (req, res) => {
    
    try {
        const { rows } = await pool.query("SELECT * FROM orders");
        res.json(rows);
        console.log(rows);
        
    } catch (error) {
        res.sendStatus(500)
        
    }
}

export const getOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({message: "No orders found"});
        }
        console.log(rows);
    }
     catch (error) {
        res.sendStatus(500)
    }
}

export const postOrder = async (req, res) => {
    const {price, date, user_id} = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { rows } = await pool.query("INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *", [price, date, user_id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}

export const modifyOrder = async (req, res) => {
    const {id} = req.params;
    const {price, date, user_id} = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { rows } = await pool.query("UPDATE orders SET  price = $1 date=$2 user_id=$3 WHERE id = $4 RETURNING *" , [ price, date, user_id, id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}

export const deleteOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}   