import type { ScriptConfig } from "src/types";

export const DIRECTORIES: string[] = [
    "config",
    "controllers",
    "routes",
    "middlewares",
    "services",
    "types",
    "utils",
    "models",
];

export const BASE_PACKAGES = [
    "express",
    "cors",
    "helmet",
    "express-rate-limit",
];

export const TS_DEV_PACKAGES = [
    "tsx",
    "@types/node",
    "@types/express",
    "typescript",
    "@types/cors",
];

export const installCmdMap: Record<string, string> = {
    npm: "install",
    pnpm: "add",
    yarn: "add",
    bun: "add",
};

export const envConfig = {
    NODE_ENV: "development",
    PORT: "3000",
    CLIENT_ORIGIN: "http://localhost:5173",
};

export const tsScripts: ScriptConfig = {
    build: "tsc",
    dev: "tsx watch --env-file=.env src/main.ts",
    start: "node --env-file=.env dist/main.js",
};

export const jsScripts: ScriptConfig = {
    dev: "node --watch --env-file=.env src/main.js",
    start: "node --env-file=.env src/main.js",
};

export const prettierScripts: ScriptConfig = {
    format: "prettier --write .",
};

export const dockerScripts: ScriptConfig = {
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:run": "node dist/main.js",
};

export const BANNER_FONT = "Standard";
export const HUSKY_COMMIT_FILE_NAME = "pre-commit";
