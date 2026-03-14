export type Cache = "redis";
export type Language = "ts" | "js";
export type Mode = "normal" | "production";
export type DevTools = "prettier" | "docker" | "git" | "husky";
export type PackageManager = "none" | "npm" | "yarn" | "pnpm" | "bun";
export type Database = "mysql" | "mariadb" | "postgres" | "mongodb";

export type DATABASE_TYPE = "sql" | "no_sql";
export type SQL_DATABASE = "mysql" | "mariadb" | "postgres";
export type SQL_ORMS = "prisma" | "drizzle" | "typeorm" | "sequelize";
export type NO_SQL_DATABASE = "mongodb";
export type NO_SQL_ORMS = "prisma" | "typeorm" | "mongoose";

export type INTERACTIVE_PROMPTS = {
    label: string;
    emoji: string;
    value: string;
};

export type ProjectConfig = {
    directory: string;
    language: Language;
    mode: Mode;
    devTools: DevTools[];
    databaseType?: DATABASE_TYPE;
    database?: Database;
    databaseOrm?: SQL_ORMS | NO_SQL_ORMS;
    pkgManager: PackageManager;
    targetDir: string;
    dirName: string;
    cache?: Cache;
};

export type ScriptConfig = {
    [key: string]: string;
};

export type ConfigFile = {
    filename: string;
    content: string;
};

export type EnvConfig = {
    database: Record<string, string>;
    admin: Record<string, string>;
};
