import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database/database.js'
import authRoute from './routes/auth.js';
import ordersRoute from './routes/orders.js';

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);

app.listen(PORT, (err) => {
    if(err) {return console.log(err)}
    console.log('Server OK', `PORT ${PORT}`);
});