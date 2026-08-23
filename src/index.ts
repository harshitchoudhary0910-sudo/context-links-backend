import express from 'express';
import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/error_middleware';
import cors from "cors";
import authRoutes from './routes/auth_routes';
import linkRoutes from './routes/link_routes';
import { connectToDatabase } from './config/db';
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/links', linkRoutes);
app.use(errorMiddleware);

async function main() {
    await connectToDatabase();
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}

main();