import path from "node:path";
import process from "node:process";
import express from "express";
import constants from "./constant.js";

const app = express();
const rootDir = process.cwd();
const staticRoute = path.join(rootDir, "public");

app.use(express.static(staticRoute));
app.use(express.json({ limit: constants.jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: constants.jsonLimit }));

export default app;
