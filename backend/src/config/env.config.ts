import "dotenv/config";

export const envConfig = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET! || "sameoldtreva",
};
