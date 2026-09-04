/* backend/src/routes/user.route.ts */

// Import router method from express
import { Router } from "express";

// Custom instance of all user controllers in one
import * as controllers from "../controllers/user.controller";

// Import downstream middleware for auth verification
import { protectRoute } from "../middleware/auth.middleware";

// Instantiate user router object
const userRouter = Router();

// POST Methods
userRouter.post("/sign-up", controllers.registerUser);
userRouter.post("/sign-in", controllers.loginUser);

// GET Method
userRouter.get("/profile", protectRoute, controllers.fetchUserProfile);

export default userRouter;
