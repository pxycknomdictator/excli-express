import { cwd } from "node:process";
import { basename, join } from "node:path";
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
    promptProxyMode,
    promptWebServer,
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
    let webServer: ProjectConfig["webServer"];
    let webServerMode: ProjectConfig["webServerMode"];
    let cache: ProjectConfig["cache"];

    if (mode === "production") {
        devTools = await promptDevTools();
        if (devTools.includes("docker")) {
            databaseType = await promptDatabaseType();
            database = await promptDatabase(databaseType!);
            databaseOrm = await promptDatabaseOrm(databaseType!);
            cache = await promptCache();
            webServer = await promptWebServer();
            webServerMode = await promptProxyMode();
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
        webServer,
        webServerMode,
        pkgManager,
        targetDir,
        rootDir,
        cache,
    };
}

export async function prepareProjectConfig(
    userInputs: Awaited<ReturnType<typeof getUserInputs>>,
    underScoreDirname: string,
) {
    const { language, pkgManager, targetDir, mode } = userInputs;

    const dirName = basename(targetDir) || "container_app";

    validatePackageManager(pkgManager);

    const templateBase = join(underScoreDirname, "..", "templates");
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
