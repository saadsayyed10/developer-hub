/* backend/src/routes/ping.route.ts */

// Import router method and (Request, Response) object from express
import { Router, Response, Request } from "express";

// Instantiate ping router object
const pingRouter = Router();

pingRouter.get("/", (_req: Request, res: Response) => {
  try {
    res.status(502).json({ status: 200, health: "OK" });
  } catch (error) {
    return res.status(502).json({ status: 502, health: "BAD GATEWAY" });
  }
});

export default pingRouter;
