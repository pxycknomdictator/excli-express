import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { envConfig } from "src/config";

function formatEnvWithComments(): { env: string; envExample: string } {
    const envLines: string[] = [];
    const exampleEnvLines: string[] = [];

    envLines.push("# Application Configuration");
    envLines.push(`NODE_ENV=${envConfig.NODE_ENV}`);
    envLines.push(`PORT=${envConfig.PORT}`);
    envLines.push(`CLIENT_ORIGIN=${envConfig.CLIENT_ORIGIN}\n`);

    exampleEnvLines.push("# Application Configuration");
    exampleEnvLines.push("NODE_ENV=");
    exampleEnvLines.push("PORT=");
    exampleEnvLines.push(`CLIENT_ORIGIN=\n`);

    return { env: envLines.join("\n"), envExample: exampleEnvLines.join("\n") };
}

export async function setupEnv(targetDir: string) {
    const { env, envExample } = formatEnvWithComments();

    const envFile = join(targetDir, ".env");
    const envExampleFile = join(targetDir, ".env.example");

    await Promise.all([
        writeFile(envFile, env, { encoding: "utf-8" }),
        writeFile(envExampleFile, envExample, { encoding: "utf-8" }),
    ]);
}
