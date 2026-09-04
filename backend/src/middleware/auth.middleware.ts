/* backend/src/middleware/auth.middleware.ts */

// Import libraries
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env.config";
import User from "../model/user.model";

// Custom interface to fix userId type from decoded token
interface DecodedType extends JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if auth header exist and it is valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Split the header and only get jwt
    const token = authHeader?.split(" ")[1];

    // Verify user ID from the token
    const decoded = jwt.verify(token, envConfig.JWT_SECRET) as DecodedType;

    // Fetch user's data from the token (except password)
    const user = await User.findById(decoded.userId).select("-password");

    // Check if token is present in the header
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token not found" });
    }

    // Check if user' data is present in the token
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not found in token" });
    }

    // Attach authenticated user's data to req object for downstreaming
    (req as any).user = user;

    // Next function to move and execute the next handler to this middleware (downstream)
    next();
  } catch (error: any) {
    return res.status(500).json({ error: error.message }); // Throw error if server fails
  }
};
