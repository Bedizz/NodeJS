

export const verifyToken = async (req, res, next) => {  
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
 

};
