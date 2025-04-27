import express, { urlencoded } from 'express';
import connectDB from './database/db.js';
import dotenv from 'dotenv';
import {router} from './routes/auth.routes.js'
import { router2 } from './routes/features.routes.js';
import path from "path";
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app =express();
dotenv.config()

const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(urlencoded())
app.use(cookieParser())
app.use(cors({origin: 'https://techies-amuhacks4-0-5.onrender.com',
    credentials:true}));
connectDB();





app.use('/auth', router);
app.use('/features',router2);


app.listen(PORT,()=>{
    console.log(`CONNECTED TO SERVER ${process.env.PORT}`);
})
