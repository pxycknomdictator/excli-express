import http from "node:http";
import app from "./app.js";
import constants from "./constant.js";

(async () => {
  const PORT = constants.configs.PORT || 5000;
  const server = http.createServer(app);

  server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
})();
