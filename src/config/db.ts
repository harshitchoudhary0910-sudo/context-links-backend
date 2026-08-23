import mongoose from "mongoose";
export async function connectToDatabase() {
    try {
       await mongoose.connect(process.env.MONGODB_URI! as string);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}