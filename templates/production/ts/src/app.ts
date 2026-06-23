import path from "node:path";
import process from "node:process";

import cors from "cors";
import helmet from "helmet";
import express from "express";
import type { Express } from "express";
import { rateLimit } from "express-rate-limit";

import { auth } from "./lib/auth.js";
import { corsOptions, globalLimiter } from "./constant.js";
import { globalErrorWrapper } from "./utils/global.js";
import { toNodeHandler } from "better-auth/node";

const app: Express = express();
const limiter = rateLimit(globalLimiter);
const staticFiles = path.join(process.cwd(), "public");

app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(express.static(staticFiles));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.all("/api/auth/*splat", toNodeHandler(auth));

import { healthRouter } from "./routes/health.js";

app.use("/", healthRouter);

app.use(globalErrorWrapper);

export { app };
