import http from "node:http";
import app from "./app.js";

import { configs } from "./constant.js";

const PORT = configs.PORT || 3000;
const server = http.createServer(app);

(() => {
    server.listen(PORT, () => {
        console.log(`Express: http://localhost:${PORT}`);
    });
})();
