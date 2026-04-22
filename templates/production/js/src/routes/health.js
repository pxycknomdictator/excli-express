import { Router } from "express";
import { healthcheck } from "../controllers/health.js";

const healthRouter = Router();

healthRouter.get("/", healthcheck);

export { healthRouter };
