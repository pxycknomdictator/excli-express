import { text, select, multiselect, isCancel, confirm } from "@clack/prompts";
import { terminate } from "src/utils";
import type {
    Database,
    DevTools,
    Language,
    PackageManager,
    Mode,
    Cache,
    DATABASE_TYPE,
    ProjectConfig,
} from "src/types";
import {
    no_sql_database,
    no_sql_orms,
    sql_database,
    sql_orms,
} from "src/config";

export async function promptDirectory(): Promise<string> {
    const directory = (await text({
        message: "What should we name your server directory?",
        placeholder: "server (press Enter for current directory)",
    })) as string;

    if (isCancel(directory)) terminate("Process cancelled ❌");

    return directory;
}

export async function promptLanguage(): Promise<Language> {
    const language = (await select({
        message: "Select your programming language:",
        options: [
            { label: "TypeScript", value: "ts" },
            { label: "JavaScript", value: "js" },
        ],
    })) as Language;

    if (isCancel(language)) terminate("Process cancelled ❌");

    return language;
}

export async function promptMode(): Promise<Mode> {
    const mode = (await select({
        message: "Select project mode:",
        options: [
            { label: "Normal", value: "normal" },
            { label: "Production", value: "production" },
        ],
    })) as Mode;

    if (isCancel(mode)) terminate("Process cancelled ❌");

    return mode;
}

export async function promptDevTools(): Promise<DevTools[]> {
    const devTools = (await multiselect({
        message: "Select development tools:",
        options: [
            { label: "Prettier", value: "prettier" },
            { label: "Docker (deployment + database)", value: "docker" },
            { label: "Git", value: "git" },
            { label: "Husky", value: "husky" },
        ],
    })) as DevTools[];

    if (isCancel(devTools)) terminate("Process cancelled ❌");

    return devTools;
}

export async function promptDatabaseType(): Promise<DATABASE_TYPE> {
    const databaseType = await select({
        message: "Select your Database type:",
        options: [
            { label: "SQL", value: "sql" },
            { label: "NOSQL", value: "no_sql" },
        ],
    });

    if (isCancel(databaseType)) terminate("Process cancelled ❌");

    return databaseType as DATABASE_TYPE;
}

export async function promptDatabase(type: DATABASE_TYPE): Promise<Database> {
    const options = type === "sql" ? sql_database : no_sql_database;

    const database = await select({
        message: "Choose your database",
        options: options.map((db) => ({
            label: db.toUpperCase(),
            value: db,
        })),
    });

    if (isCancel(database)) terminate("Process cancelled ❌");

    return database as Database;
}

export async function promptDatabaseOrm(
    type: DATABASE_TYPE,
): Promise<ProjectConfig["databaseOrm"]> {
    const options = type === "sql" ? sql_orms : no_sql_orms;

    const orm = await select({
        message: "Choose your ORM",
        options: options.map((orm) => ({
            label: orm.toUpperCase(),
            value: orm,
        })),
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

export async function promptPackageManager(): Promise<PackageManager> {
    const pkgManager = (await select({
        message: "Select your package manager:",
        options: [
            { label: "None", value: "none" },
            { label: "npm", value: "npm" },
            { label: "yarn", value: "yarn" },
            { label: "pnpm", value: "pnpm" },
            { label: "bun", value: "bun" },
        ],
    })) as PackageManager;

    if (isCancel(pkgManager)) terminate("Process cancelled ❌");

    return pkgManager;
}
