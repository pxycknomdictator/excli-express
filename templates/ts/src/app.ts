import path from "node:path";
import process from "node:process";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express, { type Express } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

import constants from "./constant.js";

const app: Express = express();
const rootDir = process.cwd();
const staticRoute = path.join(rootDir, "public");

app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(cors(constants.corsOptions));
app.use(express.static(staticRoute));
app.use(express.json({ limit: constants.jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: constants.jsonLimit }));

export default app;
