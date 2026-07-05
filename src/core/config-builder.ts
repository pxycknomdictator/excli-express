import { cwd } from "node:process";
import { cp, copyFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { copy } from "../utils";
import { tsconfigJson } from "../config";
import {
    promptAuthLibraries,
    promptCache,
    promptDatabase,
    promptDatabaseOrm,
    promptDatabaseType,
    promptDevTools,
    promptDirectory,
    promptLanguage,
    promptLogger,
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
import type { Auth, Language, ProjectConfig } from "../types";

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
    let auth: ProjectConfig["auth"];
    let webServer: ProjectConfig["webServer"];
    let webServerMode: ProjectConfig["webServerMode"];
    let cache: ProjectConfig["cache"];
    let logger: ProjectConfig["logger"];

    if (mode === "production") {
        devTools = await promptDevTools();
        logger = await promptLogger();
        if (devTools.includes("docker")) {
            databaseType = await promptDatabaseType();
            database = await promptDatabase(databaseType!);
            databaseOrm = await promptDatabaseOrm(databaseType!);
            auth = await promptAuthLibraries(databaseOrm!);
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
        logger,
        auth,
    };
}

export async function prepareProjectConfig(
    userInputs: Awaited<ReturnType<typeof getUserInputs>>,
    underScoreDirname: string,
) {
    const { language, pkgManager, targetDir, mode, auth } = userInputs;

    const dirName = basename(targetDir) || "container_app";

    validatePackageManager(pkgManager);

    const templateBase = join(underScoreDirname, "..", "templates");
    const templatePath = join(templateBase, mode, language);

    validateTemplate(templatePath);

    if (mode === "production") {
        await copyDynamicFile(templatePath, targetDir, language, auth!);
    } else {
        await copy({ targetDir, templatePath });
    }

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

async function copyDynamicFile(
    templatePath: string,
    targetDir: string,
    language: Language,
    auth: Auth,
) {
    const templateSrcPath = join(templatePath, "src");
    const targetSrcPath = join(targetDir, "src");

    await cp(templatePath, targetDir, {
        recursive: true,
        filter: (src) => {
            const normalizedSrc = src.replace(/\\/g, "/");
            return (
                !normalizedSrc.endsWith(`src/app.normal.${language}`) &&
                !normalizedSrc.endsWith(`src/app.better.auth.${language}`) &&
                !normalizedSrc.endsWith(`src/app.clerk.${language}`)
            );
        },
    });

    if (auth === "clerk") {
        await copyFile(
            join(templateSrcPath, `app.clerk.${language}`),
            join(targetSrcPath, `app.${language}`),
        );
    } else if (auth === "better-auth") {
        await copyFile(
            join(templateSrcPath, `app.better.auth.${language}`),
            join(targetSrcPath, `app.${language}`),
        );
    } else {
        await copyFile(
            join(templateSrcPath, `app.normal.${language}`),
            join(targetSrcPath, `app.${language}`),
        );
    }
}
