import express  from "express";
import 'dotenv/config';
import Route from './routes/route.js';
import OrdersRoute from './routes/OrdersRoute.js';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/users', Route)
app.use('/orders', OrdersRoute)

app.get("/", (req, res) => {
    res.send('GET request to the root')
});

app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`);
});