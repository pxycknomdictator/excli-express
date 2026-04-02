import { cwd } from "node:process";
import { basename, join } from "node:path";
import { __dirname } from "../index";
import { copy } from "../utils";
import { tsconfigJson } from "../config";
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
} from "../cli";
import {
    validateDirectory,
    validatePackageManager,
    validateTemplate,
} from "./validator";
import type { ProjectConfig } from "../types";

export async function getUserInputs() {
    const directory = await promptDirectory();

    const rootDir = cwd();
    const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
    validateDirectory(targetDir, directory);

    const language = await promptLanguage();
    const mode = await promptMode();

    let devTools: ProjectConfig["devTools"] = [];
    let databaseType: ProjectConfig["databaseType"];
    let database: ProjectConfig["database"];
    let databaseOrm: ProjectConfig["databaseOrm"];
    let cache: ProjectConfig["cache"];

    if (mode === "production") {
        devTools = await promptDevTools();
        if (devTools.includes("docker")) {
            databaseType = await promptDatabaseType();
            database = await promptDatabase(databaseType!);
            databaseOrm = await promptDatabaseOrm(databaseType!);
            cache = await promptCache();
        }
    }

    const pkgManager = await promptPackageManager(mode);

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
    const { language, pkgManager, targetDir, mode } = userInputs;

    const dirName = basename(targetDir) || "container_app";

    validatePackageManager(pkgManager);

    const templateBase = join(__dirname, "..", "templates");
    const templatePath = join(templateBase, mode, language);

    validateTemplate(templatePath);

    if (language === "ts") {
        const tsConfigJsonPath = join(templateBase, tsconfigJson);
        const tsConfigJsonDestination = join(targetDir, tsconfigJson);
        await copy({
            templatePath: tsConfigJsonPath,
            targetDir: tsConfigJsonDestination,
        });
    }

    const sourceDir = join(targetDir, "src");
    const publicDir = join(targetDir, "public");

    const config: ProjectConfig = {
        ...userInputs,
        sourceDir,
        publicDir,
        templatePath,
        dirName,
    };

    return config;
}
