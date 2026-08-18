import mongoose from "mongoose";
export function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGODB_URI! as string);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}