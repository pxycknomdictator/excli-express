import { join } from "node:path";
import { cwd } from "node:process";

import cors from "cors";
import helmet from "helmet";
import express from "express";
import type { Application, Request, Response } from "express";
import { corsOptions } from "@/constant.js";

const rootDir = cwd();
const app: Application = express();
const staticRoute = join(rootDir, "public");

app.get("/", (_: Request, res: Response) => {
  return res.sendFile(join(staticRoute, "index.html"));
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(staticRoute));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

export { app };
