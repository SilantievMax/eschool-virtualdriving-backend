import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 5001;
const LINK_DB = process.env.LINK_DB;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);

mongoose
    .connect(LINK_DB)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));


app.listen(PORT, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK', `PORT ${PORT}`);
});