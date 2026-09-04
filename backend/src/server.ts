/* backend/src/server.ts */

// Import libraries
import express from "express";
import cors from "cors";

// Import functions and instances
import { envConfig } from "./config/env.config";
import { connectDB } from "./config/db.config";
import mainRouter from "./routes/index.route";

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
