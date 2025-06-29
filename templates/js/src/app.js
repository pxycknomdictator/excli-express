import { join } from "node:path";
import { cwd } from "node:process";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

import { jsonLimit, corsOptions } from "./constant.js";

const app = express();
const rootDir = cwd();
const staticRoute = join(rootDir, "public");

app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(staticRoute));
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: jsonLimit }));

export default app;
