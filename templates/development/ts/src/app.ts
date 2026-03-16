import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (_: Request, res: Response) => {
    return res.status(200).send("<h1>Thanks for using Express Cli</h1>");
});

export { app };
