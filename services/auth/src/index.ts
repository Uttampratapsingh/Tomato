import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors({credentials: true}), express.json(), express.urlencoded({extended: true}));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Auth service is running' });
});

app.listen(PORT,()=>{
    console.log(`Auth service is running on port ${PORT}`)
})