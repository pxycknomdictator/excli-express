import { createServer } from "node:http";
import type { Request, Response } from "express";
import { app } from "./app.js";
import { configs } from "./constant.js";

app.get("/", (_: Request, res: Response) => {
  res.status(200).send("<h1>Hello World</h1>");
});

(async () => {
  const PORT = configs.PORT || 3000;
  const server = createServer(app);

  server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
})();
