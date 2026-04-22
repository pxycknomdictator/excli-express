import path from "node:path";
import process from "node:process";

import cors from "cors";
import helmet from "helmet";
import express from "express";
import { rateLimit } from "express-rate-limit";
import type { Request, Response } from "express";

import { globalLimiter } from "./constant.js";
import { globalErrorWrapper } from "./utils/global.js";

const app = express();
const limiter = rateLimit(globalLimiter);
const client = process.env.CLIENT_ORIGIN || "*";
const staticFiles = path.join(process.cwd(), "public");

app.use(limiter);
app.use(helmet());
app.use(express.static(staticFiles));
app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: client, credentials: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(globalErrorWrapper);

app.get("/", (_: Request, res: Response) => {
    return res.status(200).send("<h1>Thanks for using Express Cli</h1>");
});

export { app };
