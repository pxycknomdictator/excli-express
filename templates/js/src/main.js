import cors from "cors";
import helmet from "helmet";
import http from "node:http";
import path from "node:path";
import express from "express";
import process from "node:process";

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const client = process.env.CLIENT_ORIGIN || "*";
const staticFiles = path.join(process.cwd(), "public");

app.use(helmet());
app.use(express.static(staticFiles));
app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: client, credentials: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (_, res) => {
    return res.status(200).send("<h1>Thanks for using Excli</h1>");
});

// FIRE IN THE HOLE
(() => {
    server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
})();
