/* backend/src/config/db.config.ts */

// Mongoose library to connect database to the application server
import mongoose from "mongoose";

// Custom env instance to load database url
import { envConfig } from "./env.config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConfig.DATABASE_URL);
    console.log(`Connected to MongoDB: ${conn.connection.host}`); // Succeeded -> Log connection success info
  } catch (error: any) {
    console.log(`Error connecting to MongoDB: ${error.message}`); // Failed -> Log connection failure info
  }
};
