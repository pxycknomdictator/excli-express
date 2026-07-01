import { app } from "./app.js";
import { createServer } from "node:http";

async function bootstrap() {
    const PORT = Number(process.env.PORT) ?? 3000;
    const server = createServer(app);
    server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
}

bootstrap();
