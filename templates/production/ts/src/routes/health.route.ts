import { Router } from "express";
import { asyncWrapper } from "../utils/wrapper.js";
import { healthStatus } from "../controller/health.controller.js";

const healthRouter: Router = Router();

healthRouter.get("/", asyncWrapper(healthStatus));

export { healthRouter };
