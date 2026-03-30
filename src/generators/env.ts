import { join } from "node:path";
import { envConfig } from "src/config";
import { generateFile } from "src/utils";
import type { EnvFileReturnType, GenerateFileArgs } from "src/types";

function formatEnvWithComments(): EnvFileReturnType {
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

    return {
        envContent: envLines.join("\n"),
        exEnvContent: exampleEnvLines.join("\n"),
    };
}

export async function setupEnv(targetDir: string) {
    const { envContent, exEnvContent } = formatEnvWithComments();
    try {
        const envLocation = join(targetDir, ".env");
        const exEnvLocation = join(targetDir, ".env.example");

        const envs: GenerateFileArgs[] = [
            { fileLocation: envLocation, fileContent: envContent },
            { fileLocation: exEnvLocation, fileContent: exEnvContent },
        ];

        await Promise.all(
            envs.map(async (env) => await generateFile({ ...env })),
        );
    } catch (error) {
        throw new Error(`failed to setup env: ${error}`);
    }
}
