import { join } from "node:path";
import { fireShell } from "@/utils/shell";
import { DIRECTORIES, HUSKY_COMMIT_FILE_NAME } from "@/config/constants";
import type { Language, ProjectConfig } from "@/types";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { generatePrettierConfig } from "@/generators/prettier";
import { writeConfigFiles } from "@/utils/file";

export async function setupGit(targetDir: string): Promise<void> {
    await fireShell(`npx gitignore node`, targetDir);
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

export async function setupDocker(config: ProjectConfig): Promise<void> {
    const { devTools, database, language, pkgManager } = config;
    if (!devTools.includes("docker") || !database) return;

    const pkg = pkgManager === "none" ? "npm" : pkgManager;
    await fireShell(
        `npx --yes @excli/docker -l=${language} -d=${database} -p=${pkg}`,
        config.targetDir,
    );
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
