import http from "node:http";
import { type Request, type Response } from "express";
import app from "./app.js";
import constants from "./constant.js";

app.get("/", (_: Request, res: Response) => {
  res.status(200).send("<h1>Hello World</h1>");
});

(async () => {
  const PORT = constants.configs.PORT || 3000;
  const server = http.createServer(app);

  server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
})();
