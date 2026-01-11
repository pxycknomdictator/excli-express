#!/usr/bin/env node

import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spinner, outro, log, note } from "@clack/prompts";

import { displayBanner } from "@/cli/banner";
import {
    promptDatabase,
    promptDevTools,
    promptDirectory,
    promptLanguage,
    promptMode,
    promptPackageManager,
} from "@/cli/prompts";
import {
    validateDirectory,
    validatePackageManager,
    validateTemplate,
} from "@/core/validator";
import {
    createDirectoryStructure,
    setupProjectDirectories,
} from "@/core/scaffolder";
import { installPackages } from "@/core/installer";
import { setupEnv } from "@/generators/env";
import { setupDevTools } from "@/utils/file";
import { fireShell } from "@/utils/shell";

import type { Database, DevTools, ProjectConfig } from "@/types";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function main() {
    displayBanner();

    const userInputs = await getUserInputs();
    const config = await prepareProjectConfig(userInputs);

    await createProject(config);
    showCompletionMessage(config);
}

async function getUserInputs() {
    const directory = await promptDirectory();

    const rootDir = cwd();
    const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
    validateDirectory(targetDir, directory);

    const language = await promptLanguage();
    const mode = await promptMode();

    let devTools: DevTools[] = [];
    let database: Database | undefined;

    if (mode === "production") {
        devTools = await promptDevTools();
        if (devTools.includes("docker")) {
            database = await promptDatabase();
        }
    }

    const pkgManager = await promptPackageManager();

    return {
        directory,
        language,
        mode,
        devTools,
        database,
        pkgManager,
        targetDir,
    };
}

async function prepareProjectConfig(
    userInputs: Awaited<ReturnType<typeof getUserInputs>>,
) {
    const {
        directory,
        language,
        mode,
        devTools,
        database,
        pkgManager,
        targetDir,
    } = userInputs;

    const dirName = basename(targetDir) || "container_app";

    validatePackageManager(pkgManager);

    const templatePath = join(__dirname, "..", "templates", language);
    validateTemplate(templatePath);

    const config: ProjectConfig = {
        directory,
        language,
        mode,
        devTools,
        database,
        pkgManager,
        targetDir,
        dirName,
    };

    return { ...config, templatePath };
}

async function createProject(config: ProjectConfig & { templatePath: string }) {
    const { targetDir, mode, database, dirName, templatePath } = config;

    const s = spinner();
    s.start("Creating project...");

    try {
        if (!existsSync(targetDir)) {
            await mkdir(targetDir, { recursive: true });
        }

        const sourceDir = join(targetDir, "src");
        const publicDir = join(targetDir, "public");

        await createDirectoryStructure(targetDir, publicDir, templatePath);

        if (mode === "production" && database) {
            await setupEnv(targetDir, mode, database);
        } else {
            await setupEnv(targetDir, mode);
        }

        if (mode === "production") {
            await setupProductionProject(config, sourceDir);
        } else {
            await setupNormalProject(config);
        }

        await fireShell("npx prettier --write .", targetDir);

        s.stop(`Successfully created project \x1b[32m${dirName}\x1b[0m`);
        log.success(`Scaffolding project in ${targetDir}...`);
    } catch (error) {
        s.stop("Failed to create project");
        throw error;
    }
}

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

async function setupNormalProject(config: ProjectConfig) {
    const { pkgManager, targetDir, language, devTools, dirName } = config;
    await installPackages(pkgManager, targetDir, language, devTools, dirName);
}

function showCompletionMessage(config: ProjectConfig) {
    const { dirName, pkgManager } = config;

    if (pkgManager === "none") {
        note(
            `
To get started:
  cd ${dirName}

Install dependencies:
  npm install

Start development:
  npm run dev`,
            "📦 Setup Complete",
        );
    } else {
        note(
            `cd ${dirName}
${pkgManager} run dev`,
            "🚀 Ready to start",
        );
    }

    outro("Happy coding! ✨");
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
