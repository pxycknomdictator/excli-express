export type Language = "ts" | "js";
export type Mode = "normal" | "production";
export type DevTools = "prettier" | "docker" | "git";
export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";
export type Database = "mysql" | "postgres" | "mongodb";

export type ProjectConfig = {
    directory: string;
    language: Language;
    mode: Mode;
    devTools: DevTools[];
    database?: Database;
    pkgManager: PackageManager;
    targetDir: string;
    dirName: string;
};

export type ScriptConfig = {
    [key: string]: string;
};

export type ConfigFile = {
    filename: string;
    content: string;
};

export type EnvFile = {
    file: string;
    variables: string;
};
