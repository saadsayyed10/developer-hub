import mongoose from "mongoose";
import { envConfig } from "./env.config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConfig.DATABASE_URL);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  }
};
