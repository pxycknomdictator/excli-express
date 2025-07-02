import { join } from "node:path";
import { cwd } from "node:process";

import cors from "cors";
import helmet from "helmet";
import express, { type Express } from "express";

import { jsonLimit, corsOptions } from "./constant.js";

const app: Express = express();
const rootDir = cwd();
const staticRoute = join(rootDir, "public");

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(staticRoute));
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: jsonLimit }));

export { app };
