import { join } from "node:path";
import { envConfig } from "../config";
import { generateFile } from "../utils";
import type {
    EnvFileReturnType,
    GenerateFileArgs,
    ProjectConfig,
} from "../types";

function formatEnvWithComments(auth: ProjectConfig["auth"]): EnvFileReturnType {
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

    if (auth === "better-auth") {
        envLines.push("# Better Auth");
        envLines.push(`BETTER_AUTH_URL=${envConfig.BETTER_AUTH_URL}`);
        envLines.push(`BETTER_AUTH_SECRET=${envConfig.BETTER_AUTH_SECRET}\n`);

        exampleEnvLines.push("# Better Auth");
        exampleEnvLines.push("BETTER_AUTH_URL=");
        exampleEnvLines.push(`BETTER_AUTH_SECRET=\n`);

        prodEnvLines.push("# Better Auth");
        prodEnvLines.push(`BETTER_AUTH_URL=${envConfig.BETTER_AUTH_URL}`);
        prodEnvLines.push(
            `BETTER_AUTH_SECRET=${envConfig.BETTER_AUTH_SECRET}\n`,
        );
    }

    return {
        envContent: envLines.join("\n"),
        exEnvContent: exampleEnvLines.join("\n"),
        prodEnvContent: prodEnvLines.join("\n"),
    };
}

export async function setupEnv(config: ProjectConfig) {
    const { targetDir, auth, mode } = config;

    const { envContent, exEnvContent, prodEnvContent } =
        formatEnvWithComments(auth);
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
