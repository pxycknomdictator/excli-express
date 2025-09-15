import http from "node:http";
import { app } from "@/app";
import { env } from "@/constant";

const PORT = env.PORT || 3000;
const server = http.createServer(app);

(() => {
    server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
})();
