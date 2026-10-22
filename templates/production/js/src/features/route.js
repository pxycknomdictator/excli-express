import { Router } from "express";
import { healthRouter } from "./health/health.route.js";

const apiRouter = Router();

apiRouter.use("/", healthRouter);

export { apiRouter };
