import express from 'express';
import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/error_middleware';
import cors from "cors";

import authRoutes from './routes/auth_routes';
import linkRoutes from './routes/link_routes';
import { connectToDatabase } from './config/db';
import dotenv from "dotenv";

dotenv.config();


const app=express();
connectToDatabase();



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(cookieParser());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/links', linkRoutes);
app.use(errorMiddleware);           

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});