import { Router } from "express";
import { asyncWrapper } from "@/utils/wrapper";
import { healthStatus } from "@/controllers/health.controller";

const healthRouter: Router = Router();

healthRouter.get("/", asyncWrapper(healthStatus));

export { healthRouter };
