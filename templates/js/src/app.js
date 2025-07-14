import { join } from "node:path";
import { cwd } from "node:process";

import cors from "cors";
import helmet from "helmet";
import express from "express";

import { corsOptions } from "./constant.js";

const app = express();
const rootDir = cwd();
const staticRoute = join(rootDir, "public");

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(staticRoute));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

export { app };
