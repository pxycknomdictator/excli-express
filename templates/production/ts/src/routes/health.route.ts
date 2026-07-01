import { Router } from "express";
import { asyncWrapper } from "../utils/wrapper.js";
import { healthStatus } from "../controllers/health.controller.js";

const healthRouter: Router = Router();

healthRouter.get("/", asyncWrapper(healthStatus));

export { healthRouter };
