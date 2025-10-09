import { join } from "node:path";
import { __dirname } from "@/index";
import { fireShell } from "@/utils/shell";
import { DIRECTORIES } from "@/config/constants";
import { Language, ProjectConfig } from "@/types";
import { generateEnvFiles } from "@/generators/env";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { generateDockerCompose } from "@/generators/docker";
import { generatePrettierConfig } from "@/generators/prettier";
import { writeConfigFiles, writeEnvFiles } from "@/utils/file";

export async function setupGit(targetDir: string): Promise<void> {
    await fireShell("npx", ["gitignore", "node"], targetDir);
}

export async function setupProjectDirectories(
    language: Language,
    sourceDir: string,
): Promise<void> {
    for (const dir of DIRECTORIES) {
        if (language !== "ts" && dir === "types") continue;
        const directoryPath = join(sourceDir, dir);
        await mkdir(directoryPath, { recursive: true });
    }
}

export async function setupDocker(
    targetDir: string,
    config: ProjectConfig,
): Promise<void> {
    if (!config.devTools.includes("docker") || !config.database) return;

    const compose = generateDockerCompose(config.database);
    const composeFile = join(targetDir, "compose.yaml");
    const DockerFile = join(targetDir, "Dockerfile");

    const dockerignoreSource = join(
        __dirname,
        "..",
        "templates",
        ".dockerignore",
    );

    const dockerignoreDest = join(targetDir, ".dockerignore");

    await Promise.all([
        writeFile(DockerFile, "", { encoding: "utf-8" }),
        writeFile(composeFile, compose, { encoding: "utf-8" }),
        cp(dockerignoreSource, dockerignoreDest),
    ]);
}

export async function setupPrettier(targetDir: string): Promise<void> {
    const prettierConfigs = generatePrettierConfig();
    await writeConfigFiles(targetDir, prettierConfigs);
}

export async function setupEnvironment(targetDir: string): Promise<void> {
    const envFiles = generateEnvFiles();
    await writeEnvFiles(targetDir, envFiles);
}

export async function createDirectoryStructure(
    targetDir: string,
    publicDir: string,
    templatePath: string,
): Promise<void> {
    await Promise.all([
        mkdir(publicDir, { recursive: true }),
        cp(templatePath, targetDir, { recursive: true }),
        setupEnvironment(targetDir),
    ]);
}
