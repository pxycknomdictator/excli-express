import { join } from "node:path";
import { writeFile } from "node:fs/promises";

function getEnvVariables(): Record<string, string> {
    const envConfig = {
        NODE_ENV: "development",
        PORT: "3000",
        CLIENT_ORIGIN: "http://localhost:5173",
    };

    return envConfig;
}

function formatEnvWithComments(): string {
    const vars = getEnvVariables();
    const lines: string[] = [];

    lines.push("# Application Configuration");
    lines.push(`NODE_ENV=${vars.NODE_ENV}`);
    lines.push(`PORT=${vars.PORT}`);
    lines.push(`CLIENT_ORIGIN=${vars.CLIENT_ORIGIN}`);

    return lines.join("\n");
}

function formatEnvExampleWithComments(): string {
    getEnvVariables();
    const lines: string[] = [];

    lines.push("# Application Configuration");
    lines.push("NODE_ENV=");
    lines.push("PORT=");
    lines.push("CLIENT_ORIGIN=");

    return lines.join("\n");
}

export async function setupEnv(targetDir: string) {
    const envFile = join(targetDir, ".env");
    const envExampleFile = join(targetDir, ".env.example");

    const envContent = formatEnvWithComments();
    const envExampleContent = formatEnvExampleWithComments();

    await Promise.all([
        writeFile(envFile, envContent, { encoding: "utf-8" }),
        writeFile(envExampleFile, envExampleContent, { encoding: "utf-8" }),
    ]);
}
