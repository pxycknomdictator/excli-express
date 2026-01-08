import { join } from "node:path";
import { __dirname } from "@/index";
import { fireShell } from "@/utils/shell";
import { DIRECTORIES, HUSKY_COMMIT_FILE_NAME } from "@/config/constants";
import type { Language, PackageManager, ProjectConfig } from "@/types";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { generateDockerCompose } from "@/generators/docker";
import { generatePrettierConfig } from "@/generators/prettier";
import { writeConfigFiles } from "@/utils/file";

export async function setupGit(
    targetDir: string,
    pkgManager: PackageManager,
): Promise<void> {
    const managerMap: Record<string, string> = {
        npm: "npx",
        pnpm: "pnpm dlx",
        yarn: "yarn dlx",
        bun: "bunx",
    };

    const manager = managerMap[pkgManager] ?? null;
    await fireShell(`${manager} gitignore node`, targetDir);
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

    const dockerignoreSource = join(
        __dirname,
        "..",
        "templates",
        ".dockerignore",
    );
    const dockerfileSource = join(__dirname, "..", "templates", "Dockerfile");

    const dockerignoreDest = join(targetDir, ".dockerignore");
    const dockerFileDest = join(targetDir, "Dockerfile");

    await Promise.all([
        writeFile(composeFile, compose, { encoding: "utf-8" }),
        cp(dockerignoreSource, dockerignoreDest),
        cp(dockerfileSource, dockerFileDest),
    ]);
}

export async function setupPrettier(targetDir: string): Promise<void> {
    const prettierConfigs = generatePrettierConfig();
    await writeConfigFiles(targetDir, prettierConfigs);
}

export async function setupHusky(targetDir: string): Promise<void> {
    await fireShell("npx husky init", targetDir);
    const huskyFileLocation = join(targetDir, ".husky", HUSKY_COMMIT_FILE_NAME);
    await writeFile(huskyFileLocation, "", "utf-8");
}

export async function createDirectoryStructure(
    targetDir: string,
    publicDir: string,
    templatePath: string,
): Promise<void> {
    await Promise.all([
        mkdir(publicDir, { recursive: true }),
        cp(templatePath, targetDir, { recursive: true }),
    ]);
}
