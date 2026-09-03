import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, envConfig.JWT_SECRET, { expiresIn: "2d" });
};
