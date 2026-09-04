/* backend/src/middleware/route.middleware.ts */

// Import router method from express
import { Router } from "express";

// Custom routers
import pingRouter from "../routes/ping.route";

// Instantiate main router object
const mainRouter = Router();

mainRouter.use("/health", pingRouter);

export default mainRouter;
