import type {
    ScriptConfig,
    SQL_DATABASE,
    NO_SQL_DATABASE,
    SQL_ORMS,
    NO_SQL_ORMS,
    INTERACTIVE_PROMPTS,
} from "src/types";

export const languages: INTERACTIVE_PROMPTS[] = [
    { label: "JavaScript", emoji: "🟡", value: "js" },
    { label: "TypeScript", emoji: "🔵", value: "ts" },
];

export const database_types: INTERACTIVE_PROMPTS[] = [
    { label: "SQL", emoji: "🗃️", value: "sql" },
    { label: "NoSQL", emoji: "🌿", value: "no_sql" },
];

export const pkg_managers: INTERACTIVE_PROMPTS[] = [
    { label: "npm", emoji: "📦", value: "npm" },
    { label: "yarn", emoji: "🧶", value: "yarn" },
    { label: "pnpm", emoji: "🚀", value: "pnpm" },
    { label: "bun", emoji: "🥟", value: "bun" },
];

export const sql_database: SQL_DATABASE[] = ["mysql", "mariadb", "postgres"];
export const no_sql_database: NO_SQL_DATABASE[] = ["mongodb"];

export const sql_orms: SQL_ORMS[] = [
    "prisma",
    "drizzle",
    "typeorm",
    "sequelize",
];
export const no_sql_orms: NO_SQL_ORMS[] = ["prisma", "typeorm", "mongoose"];

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
    "@types/node",
    "@types/express",
    "typescript",
    "@types/cors",
    "concurrently",
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
    "build:watch": "tsc --watch",
    start: "node --env-file=.env dist/main.js",
    "start:watch": "node --watch --env-file=.env dist/main.js",
    dev: 'concurrently "npm run build:watch" "npm run start:watch"',
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
