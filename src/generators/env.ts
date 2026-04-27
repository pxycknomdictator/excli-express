import { join } from "node:path";
import { envConfig } from "../config";
import { generateFile } from "../utils";
import type { EnvFileReturnType, GenerateFileArgs, Mode } from "../types";

function formatEnvWithComments(): EnvFileReturnType {
    const envLines: string[] = [];
    const exampleEnvLines: string[] = [];
    const prodEnvLines: string[] = [];

    envLines.push("# Application Configuration");
    envLines.push(`NODE_ENV=${envConfig.NODE_ENV}`);
    envLines.push(`PORT=${envConfig.PORT}`);
    envLines.push(`CLIENT_ORIGIN=${envConfig.CLIENT_ORIGIN}\n`);

    exampleEnvLines.push("# Application Configuration");
    exampleEnvLines.push("NODE_ENV=");
    exampleEnvLines.push("PORT=");
    exampleEnvLines.push(`CLIENT_ORIGIN=\n`);

    prodEnvLines.push("# Application Configuration");
    prodEnvLines.push(
        `NODE_ENV=${envConfig.NODE_ENV.replace("development", "production")}`,
    );
    prodEnvLines.push(`PORT=${envConfig.PORT}`);
    prodEnvLines.push(`CLIENT_ORIGIN=${envConfig.CLIENT_ORIGIN}\n`);

    return {
        envContent: envLines.join("\n"),
        exEnvContent: exampleEnvLines.join("\n"),
        prodEnvContent: prodEnvLines.join("\n"),
    };
}

export async function setupEnv(targetDir: string, mode: Mode) {
    const { envContent, exEnvContent, prodEnvContent } =
        formatEnvWithComments();
    try {
        const envLocation = join(targetDir, ".env");
        const exEnvLocation = join(targetDir, ".env.example");
        const prodEnvLocation = join(targetDir, ".env.production");

        const envs: GenerateFileArgs[] = [
            { fileLocation: envLocation, fileContent: envContent },
            { fileLocation: exEnvLocation, fileContent: exEnvContent },
        ];

        if (mode === "production") {
            envs.push({
                fileLocation: prodEnvLocation,
                fileContent: prodEnvContent,
            });
        }

        await Promise.all(envs.map((env) => generateFile({ ...env })));
    } catch (error) {
        throw new Error(`failed to setup env: ${error}`);
    }
}
