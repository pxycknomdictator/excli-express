import http from "node:http";
import { app } from "./app.js";

async function bootstrap() {
    const PORT = process.env.PORT ?? 3000;
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
}

bootstrap();
