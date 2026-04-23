import { join } from "node:path";
import type { Language, RedisParams } from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

function redisConnection(lang: Language) {
    return `import { Redis } from "ioredis";

export const redis = new Redis(process.env.REDIS_URL${lang === "ts" ? "!" : ""});

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
    const redisFile = join(targetDir, "src", "config", "redis");
    const [redisFileLocation] = appendLanguageExtension(language, redisFile);
    const redisConnectionContent = redisConnection(language);

    await generateFile({
        fileLocation: redisFileLocation as string,
        fileContent: redisConnectionContent,
    });
}
