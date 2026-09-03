/* backend/src/middleware/auth.middleware.ts */

// Import libraries
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env.config";

// Custom interface to fix userId type from decoded token
interface DecodedType extends JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if auth header exist and it is valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const token = authHeader?.split(" ")[1];

    // const decoded = jwt.verify(token, envConfig.JWT_SECRET) as DecodedType;
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
