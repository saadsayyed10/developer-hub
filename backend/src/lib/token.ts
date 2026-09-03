// Import library
import jwt from "jsonwebtoken";

// Custom env instance to load database url
import { envConfig } from "../config/env.config";

// Generate JWT handler
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, envConfig.JWT_SECRET, { expiresIn: "2d" }); // Generate token via assigning it a user id as payload + expiry and a signature
};
