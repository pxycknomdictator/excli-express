import { cwd } from "node:process";
import { basename, join } from "node:path";
import { __dirname } from "src";
import {
    promptCache,
    promptDatabase,
    promptDatabaseOrm,
    promptDatabaseType,
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
import type {
    Cache,
    Database,
    DATABASE_TYPE,
    DevTools,
    ProjectConfig,
} from "src/types";

export async function getUserInputs() {
    const directory = await promptDirectory();

    const rootDir = cwd();
    const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
    validateDirectory(targetDir, directory);

    const language = await promptLanguage();
    const mode = await promptMode();

    let devTools: DevTools[] = [];
    let databaseType: DATABASE_TYPE | undefined;
    let database: Database | undefined;
    let databaseOrm: ProjectConfig["databaseOrm"];
    let cache: Cache | undefined;

    if (mode === "production") {
        devTools = await promptDevTools();
        if (devTools.includes("docker")) {
            databaseType = await promptDatabaseType();
            database = await promptDatabase(databaseType!);
            databaseOrm = await promptDatabaseOrm(databaseType!);
            cache = await promptCache();
        }
    }

    const pkgManager = await promptPackageManager();

    return {
        directory,
        language,
        mode,
        devTools,
        databaseType,
        database,
        databaseOrm,
        pkgManager,
        targetDir,
        rootDir,
        cache,
    };
}

export async function prepareProjectConfig(
    userInputs: Awaited<ReturnType<typeof getUserInputs>>,
) {
    const { language, pkgManager, targetDir } = userInputs;

    const dirName = basename(targetDir) || "container_app";

    validatePackageManager(pkgManager);

    const templatePath = join(__dirname, "..", "templates", language);
    validateTemplate(templatePath);

    const config: ProjectConfig = {
        ...userInputs,
        dirName,
    };

    return { ...config, templatePath };
}
