export type Language = "ts" | "js";
export type Mode = "normal" | "production";
export type DevTools = "prettier" | "docker" | "git" | "husky";
export type PackageManager = "none" | "npm" | "yarn" | "pnpm" | "bun";
export type Database = "mysql" | "mariadb" | "postgres" | "mongodb";

export type ProjectConfig = {
    directory: string;
    language: Language;
    mode: Mode;
    devTools: DevTools[];
    database?: Database;
    pkgManager: PackageManager;
    targetDir: string;
    dirName: string;
    rootDir: string;
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
