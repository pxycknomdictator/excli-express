import path from "node:path";
import process from "node:process";

import cors from "cors";
import helmet from "helmet";
import express from "express";
import { rateLimit } from "express-rate-limit";
import type { Express, Request, Response } from "express";

import { env, globalLimiter } from "@/constant";

const app: Express = express();
const client = env.CLIENT_ORIGIN || "*";
const limiter = rateLimit(globalLimiter);
const staticFiles = path.join(process.cwd(), "public");

app.use(limiter);
app.use(helmet());
app.use(express.static(staticFiles));
app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: client, credentials: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (_: Request, res: Response) => {
    return res.status(200).send("<h1>Thanks for using Express Cli</h1>");
});

export { app };
