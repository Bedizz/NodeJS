import {pool} from '../db/pool.js';

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
        const { rows } = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *", [first_name, last_name, age]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}

export const modifyUser = async (req, res) => {
    const {id} = req.params;
    const {age} = req.body;
    try {
        const { rows } = await pool.query("UPDATE users SET  age = $1 WHERE id = $2 RETURNING *" , [ age, id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        res.sendStatus(500)
    }
}   