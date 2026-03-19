import { text, select, multiselect, isCancel, confirm } from "@clack/prompts";
import { terminate } from "src/utils";
import type { Cache, DATABASE_TYPE, ProjectConfig } from "src/types";
import {
    database_types,
    generateOptions,
    languages,
    modes,
    no_sql_database,
    no_sql_orms,
    pkg_managers,
    sql_database,
    sql_orms,
    tools,
} from "src/config";

export async function promptDirectory(): Promise<string> {
    const directory = (await text({
        message: "What should we name your server directory?",
        placeholder: "server (press Enter for current directory)",
    })) as string;

    if (isCancel(directory)) terminate("Process cancelled ❌");

    return directory;
}

export async function promptLanguage(): Promise<ProjectConfig["language"]> {
    const language = await select({
        message: "Select your programming language:",
        options: generateOptions(languages),
    });

    if (isCancel(language)) terminate("Process cancelled ❌");

    return language as ProjectConfig["language"];
}

export async function promptMode(): Promise<ProjectConfig["mode"]> {
    const mode = await select({
        message: "Select project mode:",
        options: generateOptions(modes),
    });

    if (isCancel(mode)) terminate("Process cancelled ❌");

    return mode as ProjectConfig["mode"];
}

export async function promptDevTools(): Promise<ProjectConfig["devTools"]> {
    const devTools = await multiselect({
        message: "Select development tools:",
        options: generateOptions(tools),
    });

    if (isCancel(devTools)) terminate("Process cancelled ❌");

    return devTools as ProjectConfig["devTools"];
}

export async function promptDatabaseType(): Promise<
    ProjectConfig["databaseType"]
> {
    const databaseType = await select({
        message: "Select your Database type:",
        options: generateOptions(database_types),
    });

    if (isCancel(databaseType)) terminate("Process cancelled ❌");

    return databaseType as ProjectConfig["databaseType"];
}

export async function promptDatabase(
    type: DATABASE_TYPE,
): Promise<ProjectConfig["database"]> {
    const options = type === "sql" ? sql_database : no_sql_database;

    const database = await select({
        message: "Choose your database",
        options: generateOptions(options),
    });

    if (isCancel(database)) terminate("Process cancelled ❌");

    return database as ProjectConfig["database"];
}

export async function promptDatabaseOrm(
    type: DATABASE_TYPE,
): Promise<ProjectConfig["databaseOrm"]> {
    const options = type === "sql" ? sql_orms : no_sql_orms;

    const orm = await select({
        message: "Choose your ORM",
        options: generateOptions(options),
    });

    if (isCancel(orm)) terminate("Process cancelled ❌");

    return orm as ProjectConfig["databaseOrm"];
}

export async function promptCache(): Promise<Cache | undefined> {
    const shouldUseRedisCache = await confirm({
        message: "Do you want to integrate Redis for Cache?",
    });

    if (isCancel(shouldUseRedisCache)) terminate("Process cancelled ❌");

    return shouldUseRedisCache ? "redis" : undefined;
}

export async function promptPackageManager(
    mode: ProjectConfig["mode"],
): Promise<ProjectConfig["pkgManager"]> {
    const withoutNoneManagers = pkg_managers.filter(
        (manager) => manager.value !== "none",
    );

    const managers =
        mode === "development" ? pkg_managers : withoutNoneManagers;

    const pkgManager = await select({
        message: "Select your package manager:",
        options: generateOptions(managers),
    });

    if (isCancel(pkgManager)) terminate("Process cancelled ❌");

    return pkgManager as ProjectConfig["pkgManager"];
}
