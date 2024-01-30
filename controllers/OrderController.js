import {pool} from '../db/pool.js';

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
        const { rows } = await pool.query("INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *", [price, date, user_id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}

export const modifyOrder = async (req, res) => {
    const {id} = req.params;
    const {price} = req.body;
    try {
        const { rows } = await pool.query("UPDATE orders SET  price = $1 WHERE id = $2 RETURNING *" , [ price, id]);
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