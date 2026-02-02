import { cwd } from "node:process";
import { basename, join } from "node:path";
import { __dirname } from "src";
import {
    promptCache,
    promptDatabase,
    promptDevTools,
    promptDirectory,
    promptLanguage,
    promptMode,
    promptPackageManager,
} from "src/cli";
import {
    validateDirectory,
    validatePackageManager,
    validateTemplate,
} from "./validator";
import type { Cache, Database, DevTools, ProjectConfig } from "src/types";

export async function getUserInputs() {
    const directory = await promptDirectory();

    const rootDir = cwd();
    const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
    validateDirectory(targetDir, directory);

    const language = await promptLanguage();
    const mode = await promptMode();

    let devTools: DevTools[] = [];
    let database: Database | undefined;
    let cache: Cache | undefined;

    if (mode === "production") {
        devTools = await promptDevTools();
        if (devTools.includes("docker")) {
            database = await promptDatabase();
            cache = await promptCache();
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
        rootDir,
        cache,
    };
}

export async function prepareProjectConfig(
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
        cache,
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
        cache,
    };

    return { ...config, templatePath };
}
