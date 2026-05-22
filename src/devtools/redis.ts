import { join } from "node:path";
import type { RedisParams } from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

function redisConnection() {
    return `import { Redis } from "ioredis";

if (!process.env.REDIS_URL) throw new Error("REDIS_URL is not set")

export const redis = new Redis(process.env.REDIS_URL);

export async function redisPing() {
    try {
        await redis.ping();
        console.log("Redis is connected!");
    } catch (error) {
        throw new Error("failed to connect with redis: ", { cause: error });
    }
}
`;
}

export async function setupRedis({ language, targetDir }: RedisParams) {
    const redisFile = join(targetDir, "src", "lib", "redis");
    const [redisFileLocation] = appendLanguageExtension(language, redisFile);
    const redisConnectionContent = redisConnection();

    await generateFile({
        fileLocation: redisFileLocation as string,
        fileContent: redisConnectionContent,
    });
}
