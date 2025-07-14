import { createServer } from "node:http";
import { app } from "./app.js";
import { configs } from "./constant.js";

// FIRE IN THE HOLE
(async () => {
  const PORT = configs.PORT || 3000;
  const server = createServer(app);
  server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
})();
