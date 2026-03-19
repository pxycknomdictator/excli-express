import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { log, spinner } from "@clack/prompts";
import {
    createDirectoryStructure,
    setupDevTools,
    setupProjectDirectories,
} from "src/devtools";
import { fireShell } from "src/utils";
import { setupEnv } from "src/generators";
import { installPackages } from "./installer";
import type { ProjectConfig } from "src/types";

async function setupProductionProject(
    config: ProjectConfig,
    sourceDir: string,
) {
    const { language } = config;

    await Promise.all([
        setupProjectDirectories(language, sourceDir),
        setupDevTools(config),
    ]);
}

async function setupDevelopmentProject(config: ProjectConfig) {
    await installPackages(config);
}

export async function createProject(config: ProjectConfig) {
    const {
        targetDir,
        mode,
        dirName,
        templatePath,
        publicDir,
        sourceDir,
        language,
        pkgManager,
    } = config;

    const s = spinner();
    s.start("Creating project...");

    try {
        if (!existsSync(targetDir)) await mkdir(targetDir, { recursive: true });

        await Promise.all([
            createDirectoryStructure(targetDir, publicDir, templatePath),
            setupEnv(targetDir),
        ]);

        if (mode === "production") {
            await setupProductionProject(config, sourceDir);
        } else {
            await setupDevelopmentProject(config);
        }

        await fireShell("npx prettier --write .", targetDir);

        if (language === "ts" && pkgManager !== "none") {
            await fireShell("node --run build", targetDir);
        }

        s.stop(`Successfully created project \x1b[32m${dirName}\x1b[0m`);
        log.success(`Scaffolding project in ${targetDir}...`);
    } catch (error) {
        s.stop("Failed to create project");
        throw error;
    }
}
