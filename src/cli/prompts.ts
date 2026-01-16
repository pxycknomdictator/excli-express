import { text, select, multiselect, isCancel } from "@clack/prompts";
import type {
    Language,
    Mode,
    Database,
    PackageManager,
    DevTools,
} from "src/types";
import { terminate } from "src/utils/terminate";

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

export async function promptDatabase(): Promise<Database> {
    const db = (await select({
        message: "Select your database:",
        options: [
            { label: "MySQL", value: "mysql" },
            { label: "MariaDB", value: "mariadb" },
            { label: "PostgreSQL", value: "postgres" },
            { label: "MongoDB", value: "mongodb" },
        ],
    })) as Database;

    if (isCancel(db)) terminate("Process cancelled ❌");

    return db;
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
