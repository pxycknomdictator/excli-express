import { app } from "@/app";
import { database } from "@/db";
import { createServer } from "node:http";

async function bootstrap() {
    await database();
    const PORT = Number(process.env.PORT) || 3000;
    const server = createServer(app);
    server.listen(PORT, () => console.log(`Express: http://localhost:${PORT}`));
}

bootstrap();
