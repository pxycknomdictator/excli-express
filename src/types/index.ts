export type Cache = "redis";
export type Language = "ts" | "js";
export type Mode = "development" | "production";
export type DevTools = "prettier" | "docker" | "git" | "husky" | "vitest";
export type PackageManager = "none" | "npm" | "yarn" | "pnpm" | "bun";
export type Database = "mysql" | "mariadb" | "sqlite" | "postgres" | "mongodb";

export type DATABASE_TYPE = "sql" | "no_sql";
export type SQL_DATABASE = "mysql" | "mariadb" | "postgres" | "sqlite";
export type SQL_ORMS = "prisma" | "drizzle" | "typeorm" | "sequelize";
export type NO_SQL_DATABASE = "mongodb";
export type NO_SQL_ORMS = "prisma" | "typeorm" | "mongoose";

export type WEB_SERVER = "nginx" | "caddy" | "traefik";
export type WEB_SERVER_MODE = "reverse_proxy" | "load_balancing";

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
    templatePath: string;
    sourceDir: string;
    publicDir: string;
    databaseType?: DATABASE_TYPE;
    database?: Database;
    databaseOrm?: SQL_ORMS | NO_SQL_ORMS;
    webServer?: WEB_SERVER;
    webServerMode?: WEB_SERVER_MODE;
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

export type GenerateFileArgs = {
    fileLocation: string;
    fileContent: string;
};

export type EnvFileReturnType = { envContent: string; exEnvContent: string };

export type DockerParams = Pick<
    ProjectConfig,
    "database" | "language" | "pkgManager" | "cache" | "targetDir"
>;

export type ProxyParams = Pick<
    ProjectConfig,
    "webServer" | "webServerMode" | "targetDir"
>;

export type OrmParams = Pick<
    ProjectConfig,
    "language" | "database" | "databaseOrm" | "pkgManager" | "targetDir"
>;

export type VitestParams = Pick<ProjectConfig, "language" | "targetDir">;
