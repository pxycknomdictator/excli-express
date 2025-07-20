import { join } from "node:path";
import { cwd } from "node:process";

import cors from "cors";
import helmet from "helmet";
import express from "express";
import type { Request, Response } from "express";
import { corsOptions } from "@/constant.js";

const rootDir = cwd();
const app = express();
const staticRoute = join(rootDir, "public");

app.get("/", (_: Request, res: Response) => {
    return res.status(200).send("<h1>Thanks for using Excli</h1>");
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(staticRoute));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

export { app };
