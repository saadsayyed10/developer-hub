/* backend/src/config/env.config.ts */

// Import library
import "dotenv/config";

// Custom .env variables instance
export const envConfig = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET! || "sameoldtreva",
  SPECIAL_PASSWORD: process.env.SPECIAL_PASSWORD!,
};
