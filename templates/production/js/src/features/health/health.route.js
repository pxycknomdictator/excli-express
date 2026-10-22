import { Router } from "express";
import { asyncWrapper } from "../../utils/wrapper.js";
import { healthStatus } from "./health.controller.js";

const healthRouter = Router();

healthRouter.get("/", asyncWrapper(healthStatus));

export { healthRouter };
