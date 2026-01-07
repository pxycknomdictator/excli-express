#!/usr/bin/env node

import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { spinner } from "@clack/prompts";
import { fileURLToPath } from "node:url";
import { outro, log } from "@clack/prompts";
import { displayBanner } from "@/cli/banner";
import { join, basename, dirname } from "node:path";
import {
    promptDatabase,
    promptDevTools,
    promptDirectory,
    promptLanguage,
    promptMode,
    promptPackageManager,
} from "@/cli/prompts";
import type { Database, DevTools, ProjectConfig } from "@/types";
import {
    validateDirectory,
    validatePackageManager,
    validateTemplate,
} from "@/core/validator";
import {
    createDirectoryStructure,
    setupDocker,
    setupGit,
    setupHusky,
    setupPrettier,
    setupProjectDirectories,
} from "@/core/scaffolder";
import { installPackages } from "./core/installer";
import { fireShell, hasGit } from "./utils/shell";
import { setupEnv } from "./generators/env";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

displayBanner();

(async () => {
    const directory = await promptDirectory();

    const rootDir = cwd();
    const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
    const dirName = basename(targetDir) || "container_app";

    validateDirectory(targetDir, directory);

    const language = await promptLanguage();
    const mode = await promptMode();

    let devTools: DevTools[] = [];
    let database: Database | undefined;

    if (mode === "production") {
        devTools = await promptDevTools();
        if (devTools.includes("docker")) database = await promptDatabase();
    }

    const pkgManager = await promptPackageManager();
    validatePackageManager(pkgManager);

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

    const s1 = spinner({ indicator: "dots" });
    s1.start("Installing dependencies...");

    if (!existsSync(targetDir)) await mkdir(targetDir, { recursive: true });

    const sourceDir = join(targetDir, "src");
    const publicDir = join(targetDir, "public");

    const templatePath = join(__dirname, "..", "templates", language);
    validateTemplate(templatePath);

    await createDirectoryStructure(targetDir, publicDir, templatePath);

    if (mode === "production" && database) {
        await setupEnv(targetDir, mode, database);
    } else {
        await setupEnv(targetDir, mode);
    }

    if (mode === "production") {
        await setupProjectDirectories(language, sourceDir);

        if (devTools.includes("git") && hasGit()) {
            await Promise.all([
                fireShell("git init", targetDir),
                setupGit(targetDir, pkgManager),
            ]);
        }

        await Promise.all([
            setupDocker(targetDir, config),
            installPackages(pkgManager, targetDir, language, devTools, dirName),
        ]);

        if (devTools.includes("prettier")) await setupPrettier(targetDir);
        if (devTools.includes("husky")) await setupHusky(targetDir);
    } else {
        await installPackages(
            pkgManager,
            targetDir,
            language,
            devTools,
            dirName,
        );
    }

    await fireShell("npx prettier --write .", targetDir);

    s1.stop(`Successfully created project \x1b[32m${dirName}\x1b[0m`);

    log.success(`Scaffolding project in ${targetDir}...`);

    outro(`cd ${dirName}
${pkgManager} run dev
    `);
})();
