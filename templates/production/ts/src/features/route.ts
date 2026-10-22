import { Router } from "express";
import { healthRouter } from "@/features/health/health.route";

const apiRouter: Router = Router();

apiRouter.use("/", healthRouter);

export { apiRouter };
