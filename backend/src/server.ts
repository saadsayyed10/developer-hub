/* backend/src/server.ts */

// Fix for windows connectivity issue with MongoDB
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Import libraries
import express from "express";
import cors from "cors";

// Import functions and instances
import mainRouter from "./middleware/route.middleware";
import { envConfig } from "./config/env.config";
import { connectDB } from "./config/db.config";

// Setup
const app = express();
const PORT = envConfig.PORT;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", mainRouter);

// Run the backend application on a server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
